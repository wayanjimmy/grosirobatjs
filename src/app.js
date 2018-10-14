const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const config = require('./config')
const createRouter = require('./router')

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

  const router = createRouter()
  app.use('/', router)

  return app
}

module.exports = createApp
