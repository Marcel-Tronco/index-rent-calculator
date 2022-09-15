const { DB_NAME } = require('../utils/config')


const create_backups = async (db_connection) => {
  const cleaned_date_string = (new Date()).toISOString().replace(/[:.]/g,'-')
  const fileName = `backup_${cleaned_date_string}_${DB_NAME}`
  const path = process.env.PWD + '/database/backups/'+fileName
  await db_connection.backup(path)
  return path
}
module.exports = create_backups