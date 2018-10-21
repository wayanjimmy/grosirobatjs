const bcrypt = require('bcrypt')
const knex = require('knex')(require('../config/knexfile'))
const joinJs = require('join-js').default

const ex = require('../utils/express')
const { loginSchema } = require('../schemas')
const { ValidationError } = require('../utils/errors')
const { generateJWTforUser } = require('../utils/auth')
const transformers = require('../utils/transformers')
const { relationMaps, userFields, getSelect } = require('../utils/db')

const login = ex.createRoute(async (req, res) => {
  const value = await loginSchema.validate(req.body, { abortEarly: false })

  let user = await knex('users')
    .select(...getSelect('users', 'user', userFields))
    .where('email', value.email)
    .first()

  if (!user) {
    throw new ValidationError(['is invalid'], '', 'email or password')
  }

  const isValid = await bcrypt.compare(
    value.password,
    user.user_password_digest
  )

  if (!isValid) {
    throw new ValidationError(['is invalid'], '', 'email or password')
  }

  user = joinJs.mapOne([user], relationMaps, 'userMap', 'user_')

  user = generateJWTforUser(user)

  res.json(transformers.userTransformer(user))
})

module.exports = {
  login
}
