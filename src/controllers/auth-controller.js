const bcrypt = require('bcrypt')
const _ = require('lodash')

const ex = require('../utils/express')
const { User } = require('../models')
const loginSchema = require('../schemas/login-schema')
const { ValidationError } = require('../utils/errors')
const { generateJWTforUser } = require('../utils/auth')

const login = ex.createRoute(async (req, res) => {
  const value = await loginSchema.validate(req.body, { abortEarly: false })

  let user = await User.query()
    .where({
      email: value.email
    })
    .first()

  if (!user) {
    throw new ValidationError(['is invalid'], '', 'email or password')
  }

  const isValid = await bcrypt.compare(value.password, user.password_digest)

  if (!isValid) {
    throw new ValidationError(['is invalid'], '', 'email or password')
  }

  user = generateJWTforUser(user)

  res.json(
    _.omit(user, ['password_digest', 'deleted_at', 'created_at', 'updated_at'])
  )
})

module.exports = {
  login
}
