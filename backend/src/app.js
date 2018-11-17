const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const fallback = require('express-history-api-fallback')

const routerApi = require('./api/router')
const config = require('./config')

function init() {
  const app = express()

  app.enable('trust proxy', 1)
  app.disable('x-powered-by')

  if (config.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
  }

  app.use(bodyParser.text({ limit: '4mb', type: 'text/html' }))
  app.use(bodyParser.json({ limit: '4mb' }))

  const publicPath = path.join(__dirname, '../public')

  app.use('/api', routerApi)

  app.use('/', express.static(publicPath))
  app.use(fallback('index.html', { root: publicPath }))

  return app
}

module.exports = init
