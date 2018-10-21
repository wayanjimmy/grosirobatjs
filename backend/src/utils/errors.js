const { ValidationError } = require('yup')

class NotFoundError extends Error {}

module.exports = {
  ValidationError, // 422
  NotFoundError // 404
}
