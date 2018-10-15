const R = require('ramda')

const createRoute = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

module.exports = {
  createRoute
}
