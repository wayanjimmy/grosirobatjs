const auth = require('./auth-controller')
const users = require('./users-controller')
const categories = require('./categories-controller')
const me = require('./me-controller')

module.exports = {
  auth,
  users,
  categories,
  me
}
