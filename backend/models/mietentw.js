// Todo: Die Optionen an der Spalte selbst haben fehler hervorgerufen und sind jetzt deswegen an der letzten, übersetzer ggf. bearbeiten
const mietentw_table_schema = {
  tableName: 'mietentw',
  columns: [
    {
      name: 'alt',
      type: 'INTEGER'
    },
    {
      name: 'neu',
      type: 'INTEGER'
    },
    {
      name: 'wgroesse',
      type: 'INTEGER'
    },
    {
      name: 'baujahr',
      type: 'INTEGER',
    },
    {
      name: 'mvalt',
      type: 'INTEGER'
    },
    {
      name: 'viertel',
      type: 'INTEGER',
    },
    {
      name: 'addedat',
      type: 'TEXT',
      options: ', FOREIGN KEY(viertel) REFERENCES viertel(viertelid), FOREIGN KEY(baujahr) REFERENCES punkte(punkteid)'
    }
  ]
}

module.exports = mietentw_table_schema
