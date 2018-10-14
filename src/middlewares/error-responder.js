const http = require('http')
const R = require('ramda')

function createErrorResponder(_opts) {
  const opts = {
    ..._opts,
    isErrorSafeToRespond: status => status < 500
  }

  return function errorResponder(err, req, res, next) {
    let message
    const status = err.status ? err.status : 500

    const httpMessage = http.STATUS_CODES[status]
    if (opts.isErrorSafeToRespond(status)) {
      message = err.message
    } else {
      message = httpMessage
    }

    const isPrettyValidationErr = R.has('errors')
    const body = isPrettyValidationErr(err)
      ? JSON.stringify(err)
      : { status, statusText: httpMessage, messages: [message] }

    res.status(status)
    res.send(body)
  }
}

module.exports = createErrorResponder
