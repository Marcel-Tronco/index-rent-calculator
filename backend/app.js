const express = require('express')
const app = express()
const apiRouter = require('./controllers/api')
const middleware = require('./utils/middleware')

app.use(express.static('dist'))
app.use(express.json())
app.use('/api', apiRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app