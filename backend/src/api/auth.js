const bcrypt = require('bcrypt')
const _ = require('lodash')

const loginSchema = require('../schemas/login')
const User = require('../models/user')
const { ValidationError } = require('../errors')
const { generateJWTForUser } = require('../utils/auth')

async function login(req, res) {
  const value = await loginSchema.validate(req.body, { abortEarly: false })

  let user = await User.query()
    .where('email', value.email)
    .first()

  if (!user) {
    throw new ValidationError(['is invalid'], '', 'email or password')
  }

  const isValid = await bcrypt.compare(value.password, user.passwordDigest)

  if (!isValid) {
    throw new ValidationError(['is invalid'], '', 'email or password')
  }

  user = generateJWTForUser(user)

  res.json({ data: user })
}

async function me(req, res) {
  const { id } = req.payload.sub

  let user = await User.query()
    .where('id', id)
    .first()
    .throwIfNotFound()

  user = _.omit(user, ['passwordDigest', 'createdAt', 'updatedAt'])

  res.json({ data: user })
}

module.exports = {
  login,
  me
}
