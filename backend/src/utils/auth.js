//@ts-check

const jwt = require('jsonwebtoken')
const _ = require('lodash')

const config = require('../config')

function generateJWTForUser(user) {
  const token = jwt.sign(
    { sub: _.pick(user, ['id', 'email']) },
    config.JWT_SECRET,
    {
      expiresIn: '7d'
    }
  )
  user = _.omit(user, ['passwordDigest', 'createdAt', 'updatedAt'])
  return {
    ...user,
    token
  }
}

function getTokenFromHeader(req) {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1]
  }

  return null
}

module.exports = {
  generateJWTForUser,
  getTokenFromHeader
}
