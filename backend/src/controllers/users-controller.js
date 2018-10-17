const paginate = require('express-paginate')
const bcrypt = require('bcrypt')
const _ = require('lodash')

const ex = require('../utils/express')
const { User } = require('../models')
const { userSchema } = require('../schemas')

const index = ex.createRoute(async (req, res) => {
  const keyword = _.defaultTo(req.query.search, '')

  let userQuery = User.query()
    .orderBy('created_at', 'ASC')
    .whereNull('deleted_at')
    .range(req.skip, req.skip + req.query.limit - 1)

  if (keyword.length > 0) {
    userQuery = userQuery
      .where('name', 'ilike', `%${keyword}%`)
      .orWhere('email', 'ilike', `%${keyword}%`)
  }

  const { results: data, total } = await userQuery

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
    .whereNull('deleted_at')
    .findById(id)
    .throwIfNotFound()

  res.json(User.transform(data))
})

const store = ex.createRoute(async (req, res) => {
  const value = await userSchema.validate(req.body, {
    abortEarly: false,
    context: { validatePassword: true }
  })

  const passwordDigest = await bcrypt.hash(value.password, 10)

  const user = await User.query()
    .insert({
      name: value.name,
      email: value.email,
      password_digest: passwordDigest
    })
    .returning('*')

  res.json(User.transform(user))
})

const update = ex.createRoute(async (req, res) => {
  const options = { abortEarly: false, context: { validatePassword: false } }

  if (req.body.password) {
    options.context.validatePassword = true
  }

  const value = await userSchema.validate(req.body, options)

  const user = await User.query().patchAndFetchById(req.params.id, value)

  res.json(User.transform(user))
})

const destroy = ex.createRoute(async (req, res) => {
  const { id } = req.params

  const user = await User.query().patchAndFetchById(id, {
    deleted_at: new Date().toISOString()
  })

  res.json(User.transform(user))
})

module.exports = {
  index,
  show,
  store,
  update,
  destroy
}
