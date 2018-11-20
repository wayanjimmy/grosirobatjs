const _ = require('lodash')

const logger = require('../utils/logger')(__filename)

const SLICE_THRESHOLD = 1000

function createErrorLogger(_options) {
  const options = {
    ..._options,
    logRequest: status => status >= 400 && status !== 404 && status !== 503,
    logStackTrace: status => status >= 400 && status !== 503
  }

  return function errorHandler(err, req, _res, next) {
    const status = err.status ? err.status : 500
    const logLevel = getLogLevel(status)
    const log = logger[logLevel]

    if (options.logRequest(status) && !req.path.includes('/auth')) {
    }
  }
}

function getLogLevel(status) {
  return status >= 500 ? 'error' : 'warn'
}

function logRequestDetails(logLevel, req) {
  logger[logLevel]('Request headers:', deepSupressLongStrings(req.headers))
  logger[logLevel]('Request parameters:', deepSupressLongStrings(req.params))
  logger[logLevel]('Request body:', deepSupressLongStrings(req.body))
}

function deepSupressLongStrings(obj) {
  const newObj = {}
  Object.keys(obj).forEach(key => {
    const val = obj[key]

    if (_.isString(val) && val.length > SLICE_THRESHOLD) {
      newObj[key] = `${val.slice(0, SLICE_THRESHOLD)} ... [CONTENT SLICED]`
    } else if (_.isPlainObject(val)) {
      deepSupressLongStrings(val)
    } else {
      newObj[key] = val
    }
  })
  return newObj
}

module.exports = createErrorLogger
