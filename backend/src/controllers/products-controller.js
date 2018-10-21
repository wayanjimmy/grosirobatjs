const _ = require('lodash')
const paginate = require('express-paginate')
const knex = require('knex')(require('../config/knexfile'))
const joinJs = require('join-js').default

const ex = require('../utils/express')
const {
  getSelect,
  productFields,
  categoryFields,
  variantFields,
  relationMaps
} = require('../utils/db')
const { NotFoundError } = require('../utils/errors')
const transformers = require('../utils/transformers')

const variantsCountQuery = () =>
  knex('variants')
    .count('*')
    .where('product_id', knex.raw('??', ['products.id']))
    .as('product_variants_count')

let productsQuery = () =>
  knex
    .select(
      ...getSelect('products', 'product', productFields),
      ...getSelect('categories', 'category', categoryFields),
      variantsCountQuery()
    )
    .from('products')
    .leftJoin('categories', 'products.category_id', 'categories.id')
    .whereNull('products.deleted_at')

const index = ex.createRoute(async (req, res) => {
  const keyword = _.defaultTo(req.search, '')
  const { limit } = req.query
  const { skip: offset } = req

  let q = productsQuery()
    .limit(limit)
    .offset(offset)

  let countQ = knex('products').whereNull('deleted_at')

  if (keyword.length > 0) {
    q = q.where('name', 'ilike', `%${keyword}%`)
    countQ = countQ.where('name', 'ilike', `%${keyword}%`)
  }

  countQ = countQ.count()

  let [products, [countRes]] = await Promise.all([q, countQ])

  products = joinJs
    .map(products, relationMaps, 'productMap', 'product_')
    .map(({ variants, ...product }) => transformers.productTransformer(product))

  const pageCount = Math.ceil(countRes.count / limit)

  res.json({
    object: 'list',
    has_more: paginate.hasNextPages(req)(pageCount),
    data: products
  })
})

const show = ex.createRoute(async (req, res) => {
  const { id } = req.params

  const products = await productsQuery().where('products.id', id)

  if (products.length === 0) {
    throw new NotFoundError('not found')
  }

  const variantRelations = await knex('variants')
    .select(...getSelect('variants', 'variant', variantFields))
    .whereNull('deleted_at')
    .where('product_id', id)

  let variantList = []

  if (variantRelations && variantRelations.length > 0) {
    variantList = joinJs.map(
      variantRelations,
      relationMaps,
      'variantMap',
      'variant_'
    )
  }

  const product = joinJs.mapOne(
    products,
    relationMaps,
    'productMap',
    'product_'
  )

  product.variants = variantList

  res.json(transformers.productTransformer(product))
})

module.exports = {
  index,
  show
}
