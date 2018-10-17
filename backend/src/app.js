const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const paginate = require('express-paginate')

const config = require('./config')
const createRouter = require('./router')
const errorLogger = require('./middlewares/error-logger')
const errorResponder = require('./middlewares/error-responder')

function createApp() {
  const app = express()

  app.enable('trust proxy', 1)
  app.disable('x-powered-by')

  if (config.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
  }

  // Limit to 10mb if HTML has e.g. inline images
  app.use(bodyParser.text({ limit: '4mb', type: 'text/html' }))
  app.use(bodyParser.json({ limit: '4mb' }))

  app.use(paginate.middleware(5, 50))

  const router = createRouter()
  app.use('/api', router)

  app.use(errorLogger())
  app.use(errorResponder())

  return app
}

module.exports = createApp
