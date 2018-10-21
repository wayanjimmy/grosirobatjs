//@ts-check

const { format, transports, createLogger } = require('winston')
// const path = require('path')
const _ = require('lodash')

const config = require('../config')

function log(filePath) {
  // const filename = path.basename(filePath)

  const logger = createLogger({
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.timestamp(),
          format.simple()
        )
      })
      // new transports.File({ filename })
    ]
  })

  setLevelForTransports(logger, config.LOG_LEVEL || 'info')

  return logger
}

function setLevelForTransports(logger, level) {
  _.each(logger.transports, transport => (transport.level = level))
}

module.exports = log
