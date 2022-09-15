const logger = require('./utils/logger')
const initDB = require('./database/init.js')
logger.info('Starting up.')
initDB()

const app = require('./app')
const http = require('http')
const config = require('./utils/config')

// initialize database here


const server = http.createServer(app)
const PORT = config.PORT
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})