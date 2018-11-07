//@ts-check

const { format, transports, createLogger } = require('winston')
const _ = require('lodash')
const path = require('path')

const config = require('../config')

function log(filePath) {
  const fileName = path.basename(filePath)

  const logger = createLogger({
    transports: [
      new transports.Console({
        format: format.combine(
          format.label({ label: fileName }),
          format.colorize(),
          format.timestamp(),
          format.simple()
        )
      }),
      new transports.File({ filename: 'error.log' })
    ]
  })

  setLevelForTransports(logger, config.LOG_LEVEL || 'info')

  return logger
}

function setLevelForTransports(logger, level) {
  _.each(logger.transports, transport => (transport.level = level))
}

module.exports = log
