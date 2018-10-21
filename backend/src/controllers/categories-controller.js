const _ = require('lodash')
const knex = require('knex')(require('../config/knexfile'))
const joinJs = require('join-js').default

const ex = require('../utils/express')
const { categorySchema } = require('../schemas')
const { relationMaps, categoryFields, getSelect } = require('../utils/db')
const { categoryTransformer } = require('../utils/transformers')
const { NotFoundError } = require('../utils/errors')

const categoryQuery = () =>
  knex('categories')
    .select(...getSelect('categories', 'category', categoryFields))
    .whereNull('deleted_at')

const index = ex.createRoute(async (req, res) => {
  const keyword = _.defaultTo(req.query.search, '')

  let q = categoryQuery().orderBy('created_at', 'ASC')

  if (keyword.length > 0) {
    q = q.where('name', 'ilike', `%${keyword}%`)
  }

  let categories = await q

  categories = joinJs.map(categories, relationMaps, 'categoryMap', 'category_')

  res.json({
    object: 'list',
    data: categories.map(category => categoryTransformer(category))
  })
})

const show = ex.createRoute(async (req, res) => {
  const { id } = req.params

  const categories = await categoryQuery().where('id', id)

  if (categories.length === 0) {
    throw new NotFoundError('not found')
  }

  const category = joinJs.mapOne(
    categories,
    relationMaps,
    'categoryMap',
    'category_'
  )

  res.json(categoryTransformer(category))
})

const store = ex.createRoute(async (req, res) => {
  const value = await categorySchema.validate(req.body, { abortEarly: false })

  let categories = await knex('categories')
    .insert(value)
    .returning('*')

  category = joinJs.mapOne(categories, relationMaps, 'categoryMap', '')

  res.json(categoryTransformer(category))
})

const update = ex.createRoute(async (req, res) => {
  const value = await categorySchema.validate(req.body, { abortEarly: false })

  const { id } = req.params

  let categories = await knex('categories')
    .where('id', id)
    .whereNull('deleted_at')
    .update(value)
    .returning('*')

  categories = joinJs.mapOne(categories, relationMaps, 'categoryMap', '')

  res.json(categoryTransformer(categories))
})

const destroy = ex.createRoute(async (req, res) => {
  const { id } = req.params

  let categories = await knex('categories')
    .whereNull('deleted_at')
    .where('id', id)
    .update({
      deleted_at: new Date().toISOString()
    })
    .returning('*')

  categories = joinJs.mapOne(categories, relationMaps, 'categoryMap', '')

  res.json(categoryTransformer(categories))
})

module.exports = {
  index,
  show,
  store,
  update,
  destroy
}
