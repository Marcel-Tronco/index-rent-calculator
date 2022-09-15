const Database = require('better-sqlite3')
const { SqlError } = require('../utils/error')
const unorderedViertel = require('./viertel')
const { DB_PATH } = require('../utils/config')
const db_path = DB_PATH
const logger = require('../utils/logger')
const mietentwModel = require('../models/mietentw')
const viertelModel = require('../models/viertel')
const punkteModel = require('../models/punkte')
const punkteDict = require('../database/punkteDict')

const viertel = unorderedViertel.sort((el1,el2) =>  {
  let a = el1.label.toLowerCase()
  let b = el2.label.toLowerCase()
  if ( a < b ) {
    return -1
  }
  else if ( a === b ) {
    return 0
  }
  else {
    return 1
  }
}).map((el, index) => {
  return {
    ...el,
    id: index
  }
})

const table_creation_query_factory = (tableName, columns, schemaName, tableOptions) => {
  if (!tableName || typeof tableName !== 'string' || columns.length < 1) {
    throw new SqlError
  }
  const query = `CREATE TABLE IF NOT EXISTS ${schemaName? schemaName + ' . ' : ''}${tableName} (${
    columns.map((column) => `${column.name} ${column.type}${column.options ? ' ' + column.options : ''}`)
  })${tableOptions ? ' ' + tableOptions : ''};`
  return query
}

const table_existence_query_factory = (tableName) => `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`

const init = () => {
  logger.info('Initializing the Database')
  const db = new Database(db_path, { readonly: false, timeout: 5000, verbose: null })

  /**
   * First checking if tables have been initialized.
   */
  if (! db.prepare(table_existence_query_factory('viertel')).get()) {
    db.prepare(table_creation_query_factory(
      viertelModel.tableName,
      viertelModel.columns
    )).run()
    // add some viertel here.
    const addViertelStmt = db.prepare('INSERT INTO viertel ( viertelid, name, wlz ) VALUES ( @id, @name, @wlz );')
    for (let el of viertel) {
      addViertelStmt.run({ name:el.label, wlz:el.wlz, id: el.id })
    }
  }

  if ( ! db.prepare(table_existence_query_factory(punkteModel.tableName)).get()) {
    db.prepare(table_creation_query_factory(
      punkteModel.tableName,
      punkteModel.columns
    )).run()

    // Add data from PunktDict
    const addPunkteStmt = db.prepare('INSERT INTO punkte ( punkteid, description, value ) VALUES ( @punkteid, @description, @value)')

    Object.entries(punkteDict).forEach(([key, value]) => {
      addPunkteStmt.run({
        punkteid: key,
        description: value.description,
        value: value.value
      })
    })
  }

  if (! db.prepare(table_existence_query_factory(mietentwModel.tableName)).get()) {
    db.prepare(table_creation_query_factory(
      mietentwModel.tableName,
      mietentwModel.columns
    )).run()

    if (process.env.NODE_ENV !== 'production'){
      // add some mietentws for testing
      const mietentw_data = require('./mock_mietentw')
      const addMietentwStmt = db.prepare('INSERT INTO mietentw (alt, neu, wgroesse, baujahr, mvalt, viertel, addedat) VALUES ( @alt, @neu, @wgroesse, @baujahr, @mvalt, @viertel, @addedat);')
      for (let el of mietentw_data) {
        addMietentwStmt.run({ alt: el.before, neu: el.now, viertel: el.viertelId, baujahr: el.baujahr, wgroesse: el.wgroesse, mvalt: el.mvalt, addedat: (new Date()).toISOString() })
      }
    }
  }
  logger.info('Initialization finished')
}

module.exports = init