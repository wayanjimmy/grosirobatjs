//@ts-check

const paginate = require('express-paginate')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const knex = require('knex')(require('../config/knexfile'))
const joinJs = require('join-js').default

const ex = require('../utils/express')
const { userSchema } = require('../schemas')
const { getSelect, relationMaps, userFields } = require('../utils/db')
const { userTransformer } = require('../utils/transformers')
const { NotFoundError } = require('../utils/errors')

const userQuery = () =>
  knex('users')
    .select(...getSelect('users', 'user', userFields))
    .whereNull('deleted_at')

const index = ex.createRoute(async (req, res) => {
  const keyword = _.defaultTo(req.query.search, '')
  const {
    offset,
    query: { limit }
  } = req

  let q = userQuery()
    .limit(limit)
    .offset(offset)

  let countQ = knex('users').whereNull('deleted_at')

  if (keyword.length > 0) {
    q = q
      .where('name', 'ilike', `%${keyword}%`)
      .orWhere('email', 'ilike', `%${keyword}%`)

    countQ = countQ
      .where('name', 'ilike', `%${keyword}%`)
      .orWhere('email', 'ilike', `%${keyword}%`)
  }

  countQ = countQ.count()

  let [users, [countRes]] = await Promise.all([q, countQ])

  const pageCount = Math.ceil(countRes.count / limit)

  users = joinJs.map(users, relationMaps, 'userMap', 'user_')

  res.json({
    object: 'list',
    has_more: paginate.hasNextPages(req)(pageCount),
    data: users.map(user => userTransformer(user))
  })
})

const show = ex.createRoute(async (req, res) => {
  const { id } = req.params

  let users = await userQuery().where('id', id)

  if (users.length === 0) {
    throw new NotFoundError('not found')
  }

  users = joinJs.mapOne(users, relationMaps, 'userMap', 'user_')

  res.json(userTransformer(users))
})

const store = ex.createRoute(async (req, res) => {
  const value = await userSchema.validate(req.body, {
    abortEarly: false,
    context: { validatePassword: true }
  })

  const passwordDigest = await bcrypt.hash(value.password, 10)

  let users = await knex('users')
    .insert({
      name: value.name,
      email: value.email,
      password_digest: passwordDigest
    })
    .returning('*')

  if (users.length === 0) {
    throw new NotFoundError('not found')
  }

  users = joinJs.mapOne(users, relationMaps, 'userMap', '')

  res.json(userTransformer(users))
})

const update = ex.createRoute(async (req, res) => {
  const options = { abortEarly: false, context: { validatePassword: false } }

  if (req.body.password) {
    options.context.validatePassword = true
  }

  let value = await userSchema.validate(req.body, options)

  if (value.password) {
    value.password_digest = bcrypt.hashSync(value.password, 10)
    delete value.password
  }

  const { id } = req.params

  let users = await knex('users')
    .whereNull('deleted_at')
    .where('id', id)
    .update({ ...value, updated_at: new Date().toISOString() })
    .returning('*')

  if (users.length === 0) {
    throw new NotFoundError('not found')
  }

  users = joinJs.mapOne(users, relationMaps, 'userMap', '')

  res.json(userTransformer(users))
})

const destroy = ex.createRoute(async (req, res) => {
  const { id } = req.params

  let users = await knex('users')
    .whereNull('deleted_at')
    .where('id', id)
    .update({ deleted_at: new Date().toISOString() })
    .returning('*')

  if (users.length === 0) {
    throw new NotFoundError('not found')
  }

  users = joinJs.mapOne(users, relationMaps, 'userMap', '')

  res.json(userTransformer(users))
})

module.exports = {
  index,
  show,
  store,
  update,
  destroy
}
