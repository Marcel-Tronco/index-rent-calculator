const Database = require('better-sqlite3')
const { DB_PATH } = require('../utils/config')
const options = { readonly: false, timeout: 5000, verbose: null }
const db_connection = () => new Database(DB_PATH, options)

const decoratedQueryString =  'SELECT alt, neu, wgroesse, punkte.description AS baujahr, baujahr AS baujahrid, ' +
                              'mvalt, viertel.wlz as wlz, viertel.name as viertelname, addedat ' +
                              'FROM mietentw ' +
                              'INNER JOIN viertel ON  viertel.viertelid = mietentw.viertel ' +
                              'INNER JOIN punkte ON punkte.punkteid = mietentw.baujahr '

const addEntryStmt = (db_connection) => {
  return db_connection.prepare('INSERT INTO mietentw (alt, neu, wgroesse, baujahr, mvalt, viertel, addedat) VALUES ( @alt, @neu, @wgroesse, @baujahr, @mvalt, @viertel, @addedat);')
}

const getAllStmt = (db_connection) => {
  return db_connection.prepare('SELECT * FROM mietentw;')
}

const getAllDecoratedStmt = (db_connection) => {
  return db_connection.prepare(decoratedQueryString)
}

const getPreparedStatements = (db_connection) => {
  return {
    addEntry: addEntryStmt(db_connection),
    getAll: getAllStmt(db_connection),
    getAllDecorated: getAllDecoratedStmt(db_connection)

  }
}

module.exports = {
  db_connection,
  getPreparedStatements
}