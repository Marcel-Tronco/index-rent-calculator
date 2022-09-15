const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('QueryParams:', Object.entries(request.query).map(([key, val]) => `${key}: ${val}`))
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: true, message: 'unknown endpoint' })
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, _request, response, _next) => {
  if (error.name === 'BadCredentialsError') {
    response.status(404).send({ error: true, message: 'unknown endpoint' })
  }
  else if (error.name === 'ValidationError') {
    logger.error(`${error.name}:\n`, error.message)
    return response.status(400).send({
      error: true,
      message: 'Invalid Data'
    })
  }
  else {
    logger.error(`${error.name}:\n`, error)
    return response.status(500).send({
      error: true,
      message: 'Internal Server Error'
    })
  }

}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}