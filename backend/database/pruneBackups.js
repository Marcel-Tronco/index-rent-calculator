const fs = require('fs/promises')
const { BACKUP_DIR } = require('../utils/config')
const logger = require('../utils/logger')

const pruner = async () => {
  logger.info('Pruning the backups', BACKUP_DIR)
  const files = await fs.readdir(BACKUP_DIR)
  await Promise.all(
    files.map((file) => {
      return fs.rm(BACKUP_DIR + '/' + file)
    })
  )
  logger.info('Deleted Backups:', files.length)
  logger.info('Pruning done.')
}
module.exports = pruner