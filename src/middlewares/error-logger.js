const R = require('ramda')

const logger = require('../utils/logger')(__filename)

const SLICE_THRESHOLD = 1000

function createErrorLogger(_opts) {
  const opts = {
    ..._opts,
    logRequest: status => status >= 400 && status !== 404 && status !== 503,
    logStackTrace: status => status >= 500 && status !== 503
  }

  return function errorHandler(err, req, res, next) {
    const status = err.status ? err.status : 500
    const logLevel = getLogLevel(status)
    const log = logger[logLevel]

    if (opts.logRequest(status)) {
      logRequestDetails(logLevel, req)
    }

    if (opts.logStackTrace(status)) {
      log(err, err.stack)
    } else {
      log(err.toString())
    }

    next(err)
  }
}

function getLogLevel(status) {
  return status >= 500 ? 'error' : 'warn'
}

function logRequestDetails(logLevel, req) {
  logger[logLevel]('Request headers: ', deep)
}

function deepSupressLongStrings(obj) {
  const newObj = {}
  R.forEach((val, key) => {
    if (R.is(String, val) && val.length > SLICE_THRESHOLD) {
      newObj[key] = `${val.slice(0, SLICE_THRESHOLD)} ... [CONTENT SLICED]`
    } else if (R.is(Object, val)) {
      deepSupressLongStrings(val)
    } else {
      newObj[key] = val
    }
  }, obj)

  return newObj
}

module.exports = createErrorLogger
