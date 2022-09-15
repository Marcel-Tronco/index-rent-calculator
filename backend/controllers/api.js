const config = require('../utils/config')
const { BadCredentialsError } = require('../utils/error')
const createBackup = require('../database/createBackup')
const pruneBackups = require('../database/pruneBackups')
const { db_connection, getPreparedStatements } = require('../database/db_connection')
const db = db_connection('./database/')
const { addEntry, getAllDecorated } = getPreparedStatements(db)
const apiRouter = require('express').Router()
const toCSV = require('../utils/toCSV')
const slowDown = require('express-slow-down')
const { requestLogger } = require('../utils/middleware')
const { ValidationError } = require('../utils/error')


const resetPasswordSpeedLimiter = slowDown({
  windowMs: 60 * 60 * 1000, // 60 minutes
  delayAfter: 1, // allow 1 requests to go at full-speed, then...
  delayMs: 1000 //  the second request has a 1s delay, 3th gets 3s, etc.
})

const validateInput = (data) => {
  data['addedat'] = (new Date).toISOString()
  console.log(data)
  if (
    ! ( typeof data.alt === 'number' && data.alt >= 0)
    || ! (typeof data.neu === 'number' && data.neu >= 0)
    || ! (typeof data.wgroesse === 'number' && data.wgroesse >= 0)
    || ! (
      typeof data.baujahr === 'number'
      && data.baujahr >= 0 && data.baujahr <= 5
    )
    || ! ( data.mvalt === 0 || data.mvalt === 1)
    || ! ( typeof data.viertel === 'number' && data.viertel >= 0)
  ) {
    throw new ValidationError('Validating data input of /api/add failed')
  }
  return data
}

apiRouter.post('/add', async (request, response, next) => {
  try {
    const data = validateInput(request.body)
    await addEntry.run(data)
    response.status(201).send()
  } catch (error) {
    next(error)
  }
})
apiRouter.get('/backup', resetPasswordSpeedLimiter, requestLogger, async (request, response, next) => {
  try {
    if (!request.query.pw || request.query.pw !== config.PW) {
      throw new BadCredentialsError
    }
    else if (request.query.prune === 'true') {
      const result = await pruneBackups()
      console.log(result)
      response.json({ error: false, message: 'Prune successfull' })
    }
    else if (request.query.csv === 'true') {
      // If amounts of data gets bigger this needs to be done in pages and as a stream,
      // this simple setup works only in small sets of data!!!
      // streaming will work with res.write(data) and at the end res.end()

      const csvContents = toCSV(getAllDecorated.all())
      response.set({ 'Content-Disposition':'attachment; filename="mietentw.csv"' })
      response.send(csvContents)
    }
    else {
      const backupPath = await createBackup(db)
      response.download(backupPath)
    }
  }
  catch (error) {
    next(error)
  }
})

module.exports = apiRouter