//@ts-check

const { format, transports, createLogger } = require('winston')
const _ = require('lodash')
const path = require('path')

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
      })
    ]
  })

  setLevelForTransports(logger, 'debug')

  return logger
}

function setLevelForTransports(logger, level) {
  _.each(logger.transports, t => (t.level = level))
}

module.exports = log
