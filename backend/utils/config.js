

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const DB_NAME = `${
  process.env.NODE_ENV === 'production'
    ? ''
    : 'test_'
}mietentwicklung.db`

const PORT = process.env.PORT || 8080
//let SECRET_STRING = process.env.SECRET_STRING
const ROOT_DIR = __dirname.replace('/utils', '')
const BACKUP_DIR = ROOT_DIR + '/database/backups'
const DB_PATH = ROOT_DIR + '/database/data/' + DB_NAME
const PW = process.env.PW || 'no_pw'

module.exports = {
  PORT,
  PW,
  DB_NAME,
  BACKUP_DIR,
  ROOT_DIR,
  DB_PATH
}