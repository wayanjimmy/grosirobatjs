const paginate = require('express-paginate')
const _ = require('lodash')

const ex = require('../utils/express')
const { Distributor } = require('../models')

const index = ex.createRoute(async (req, res) => {
  const keyword = _.defaultTo(req.query.search, '')

  let distributorQuery = Distributor.query()
    .whereNull('deleted_at')
    .orderBy('created_at', 'ASC')
    .range(req.skip, req.skip + req.query.limit - 1)

  if (keyword.length > 0) {
    distributorQuery = distributorQuery.where('name', 'ilike', `%${keyword}%`)
  }

  const { results: data, total } = await distributorQuery

  const pageCount = Math.ceil(total / req.query.limit)

  res.json({
    object: 'list',
    has_more: paginate.hasNextPages(req)(pageCount),
    data: data.map(distributor => Distributor.transform(distributor))
  })
})

const show = ex.createRoute(async (req, res) => {
  const { id } = req.params

  const distributor = await Distributor.query()
    .whereNull('deleted_at')
    .where('id', id)
    .first()
    .throwIfNotFound()

  res.json(Distributor.transform(distributor))
})

const store = ex.createRoute(async (req, res) => {

})

module.exports = {
  index,
  show
}