const paginate = require('express-paginate')
const _ = require('lodash')
const knex = require('knex')(require('../config/knexfile'))
const joinJs = require('join-js').default

const ex = require('../utils/express')
const { distributorSchema } = require('../schemas')
const { getSelect, relationMaps, distributorFields } = require('../utils/db')
const { distributorTransformer } = require('../utils/transformers')
const { NotFoundError } = require('../utils/errors')

const distributorQuery = () =>
  knex('distributors')
    .select(...getSelect('distributors', 'distributor', distributorFields))
    .whereNull('deleted_at')

const index = ex.createRoute(async (req, res) => {
  const keyword = _.defaultTo(req.query.search, '')
  const { limit } = req.query
  const { skip: offset } = req

  let q = distributorQuery()
    .limit(limit)
    .offset(offset)
    .orderBy('created_at', 'ASC')

  let countQ = knex('distributors').whereNull('deleted_at')

  if (keyword.length > 0) {
    q = q.where('name', 'ilike', `%${keyword}%`)
    countQ = countQ.where('name', 'ilike', `%${keyword}%`)
  }

  countQ = countQ.count()

  let [distributors, [countRes]] = await Promise.all([q, countQ])

  distributors = joinJs.map(
    distributors,
    relationMaps,
    'distributorMap',
    'distributor_'
  )

  const pageCount = Math.ceil(countRes.count / limit)

  res.json({
    object: 'list',
    has_more: paginate.hasNextPages(req)(pageCount),
    data: distributors.map(distributor => distributorTransformer(distributor))
  })
})

const show = ex.createRoute(async (req, res) => {
  const { id } = req.params

  let distributors = await distributorQuery().where('id', id)

  if (distributors.length === 0) {
    throw new NotFoundError('not found')
  }

  distributors = joinJs.mapOne(
    distributors,
    relationMaps,
    'distributorMap',
    'distributor_'
  )

  res.json(distributorTransformer(distributors))
})

const store = ex.createRoute(async (req, res) => {
  const value = await distributorSchema.validate(req.body, {
    abortEarly: false
  })

  let distributors = await knex('distributors')
    .insert(value)
    .returning('*')

  distributors = joinJs.mapOne(distributors, relationMaps, 'distributorMap', '')

  res.json(distributorTransformer(distributors))
})

const update = ex.createRoute(async (req, res) => {
  const value = await distributorSchema.validate(req.body, {
    abortEarly: false
  })

  const { id } = req.params

  let distributors = await knex('distributors')
    .whereNull('deleted_at')
    .where('id', id)
    .update(value)
    .returning('*')

  distributors = joinJs.mapOne(distributors, relationMaps, 'distributorMap', '')

  res.json(distributorTransformer(distributors))
})

const destroy = ex.createRoute(async (req, res) => {
  const { id } = req.params

  let distributors = await knex('distributors')
    .whereNull('deleted_at')
    .where('id', id)
    .update({ deleted_at: new Date().toISOString() })
    .returning('*')

  distributors = joinJs.mapOne(distributors, relationMaps, 'distributorMap', '')

  res.json(distributorTransformer(distributors))
})

module.exports = {
  index,
  show,
  store,
  update,
  destroy
}
