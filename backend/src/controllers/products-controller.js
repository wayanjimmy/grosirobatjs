const _ = require('lodash')
const paginate = require('express-paginate')
const knex = require('knex')(require('../config/knexfile'))
const joinJs = require('join-js').default

const ex = require('../utils/express')
const {
  getSelect,
  productFields,
  categoryFields,
  relationMaps
} = require('../utils/db')

const index = ex.createRoute(async (req, res) => {
  const keyword = _.defaultTo(req.search, '')

  let productsQuery = knex
    .select(
      ...getSelect('products', 'product', productFields),
      ...getSelect('categories', 'category', categoryFields)
    )
    .from('products')
    .leftJoin('categories', 'products.category_id', 'categories.id')
    .limit(req.query.limit)
    .offset(req.skip)
    .whereNull('products.deleted_at')

  let countQuery = knex('products').whereNull('deleted_at')

  if (keyword.length > 0) {
    productsQuery = productsQuery.where('name', 'ilike', `%${keyword}%`)
    countQuery = countQuery.where('name', 'ilike', `%${keyword}%`)
  }

  countQuery = countQuery.count()

  let [products, [countRes]] = await Promise.all([productsQuery, countQuery])

  products = joinJs
    .map(products, relationMaps, 'productMap', 'product_')
    .map(product => ({
      object: 'product',
      ...product,
      category: {
        object: 'category',
        ...product.category
      }
    }))

  const total = countRes.count

  const pageCount = Math.ceil(total / req.query.limit)

  res.json({
    object: 'list',
    has_more: paginate.hasNextPages(req)(pageCount),
    data: products
  })
})

module.exports = {
  index
}
