const _ = require('lodash')

const errors = require('../utils/errors')

function createErrorResponder() {
  return function errorResponder(err, _req, res, _next) {
    switch (true) {
      case err.name === 'UnauthorizedError':
        res.status(401).json({
          message: 'invalid token ...',
          data: {}
        })
        break

      case err instanceof errors.ValidationError:
        res.status(422).json({
          message: err.message.toLowerCase(),
          data: formatValidationError(err)
        })
        break

      case err instanceof errors.NotFoundError:
        res.status(404).json({
          message: err.message.toLowerCase(),
          data: {}
        })
        break

      default:
        res.status(500).json({
          message: err.message.toLowerCase(),
          data: {}
        })
        break
    }
  }
}

function formatValidationError(err) {
  const result = {}
  if (err.path) {
    result[err.path] = [_.defaultTo(err.message, 'is not valid')]
  }
  if (err.inner && err.inner.length > 0) {
    err.inner
      .map(err => formatValidationError(err))
      .reduce((prev, curr) => Object.assign(prev, curr), result)
  }
  return result
}

module.exports = createErrorResponder
