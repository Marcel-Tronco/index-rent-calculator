
const punkte_table_schema = {
  tableName: 'punkte',
  columns: [
    {
      name: 'punkteid',
      type: 'INTEGER',
      options: 'PRIMARY KEY'
    },
    {
      name: 'description',
      type: 'TEXT'
    },
    {
      name: 'value',
      type: 'INTEGER'
    }
  ]
}

module.exports = punkte_table_schema
