const { NotFoundError, ValidationError } = require('objection')

const throwError = (
  code,
  errorType,
  errorMessage = 'Something wrong'
) => error => {
  if (!error) {
    error = new Error(errorMessage)
  }
  error.code = code
  error.errorType = errorType
  throw error
}

const throwIf = (fn, code, errorType, errorMessage) => result => {
  if (fn(result)) {
    return throwError(code, errorType, errorMessage)()
  }
  return result
}

const sendError = (res, status, message) => error => {
  if (error instanceof ValidationError) {
  } else if (error instanceof NotFoundError) {
    res.status(404).json({
      message: error.message,
      type: 'NotFound',
      data: {}
    })
  }

  res.status(status || error.statusCode).json({
    message: message || 'Something wrong',
    type: 'error',
    data: {}
  })
}

module.exports = {
  throwError,
  throwIf,
  sendError
}
