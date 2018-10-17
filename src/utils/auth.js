const jwt = require('jsonwebtoken')
const _ = require('lodash')

const config = require('../config')

function generateJWTforUser(user = {}) {
  return {
    ...user,
    token: jwt.sign(
      {
        sub: _.pick(user, ['id', 'email'])
      },
      config.JWT_SECRET,
      { expiresIn: '7d' }
    )
  }
}

module.exports = {
  generateJWTforUser
}
