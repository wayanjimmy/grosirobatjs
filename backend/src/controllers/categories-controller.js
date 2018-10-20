const _ = require('lodash')

const ex = require('../utils/express')
const { Category } = require('../models')
const { categorySchema } = require('../schemas')

const index = ex.createRoute(async (req, res) => {
  const keyword = _.defaultTo(req.query.search, '')

  let categoryQuery = Category.query()
    .orderBy('created_at', 'ASC')
    .whereNull('deleted_at')

  if (keyword.length > 0) {
    categoryQuery = categoryQuery.where('name', 'ilike', `%${keyword}%`)
  }

  const data = await categoryQuery

  res.json({
    object: 'list',
    data: data.map(category => Category.transform(category))
  })
})

const show = ex.createRoute(async (req, res) => {
  const { id } = req.params

  const category = await Category.query()
    .findById(id)
    .throwIfNotFound()

  res.json(Category.transform(category))
})

const store = ex.createRoute(async (req, res) => {
  const value = await categorySchema.validate(req.body, { abortEarly: false })

  const category = await Category.query()
    .insert(value)
    .returning('*')

  res.json(Category.transform(category))
})

const update = ex.createRoute(async (req, res) => {
  const value = await categorySchema.validate(req.body, { abortEarly: false })

  const { id } = req.params

  const category = await Category.query().patchAndFetchById(id, value)

  res.json(Category.transform(category))
})

const destroy = ex.createRoute(async (req, res) => {
  const { id } = req.params

  const category = await Category.query().patchAndFetchById(id, {
    deleted_at: new Date().toISOString()
  })

  res.json(Category.transform(category))
})

module.exports = {
  index,
  show,
  store,
  update,
  destroy
}
