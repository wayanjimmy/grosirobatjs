const paginate = require('express-paginate')
const bcrypt = require('bcrypt')

const ex = require('../utils/express')
const { User } = require('../models')
const { userSchema } = require('../schemas')

const index = ex.createRoute(async (req, res) => {
  const { results: data, total } = await User.query()
    .orderBy('created_at', 'ASC')
    .range(req.skip, req.query.limit)

  const pageCount = Math.ceil(total / req.query.limit)

  res.json({
    object: 'list',
    has_more: paginate.hasNextPages(req)(pageCount),
    data: data.map(user => User.transform(user))
  })
})

const show = ex.createRoute(async (req, res) => {
  const { id } = req.params

  const data = await User.query()
    .findById(id)
    .throwIfNotFound()

  res.json(User.transform(data))
})

const store = ex.createRoute(async (req, res) => {
  const value = await userSchema.validate(req.body, {
    abortEarly: false,
    context: { validatePassword: true }
  })

  const passwordDigest = bcrypt.hashSync(value.password, 10)

  const user = await User.query()
    .insert({
      name: value.name,
      email: value.email,
      password_digest: passwordDigest
    })
    .returning('*')

  res.json(User.transform(user))
})

module.exports = {
  index,
  show,
  store
}
