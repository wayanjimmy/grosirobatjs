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

const variantsCountQuery = knex('variants')
  .count('*')
  .where('product_id', knex.raw('??', ['products.id']))
  .as('product_variants_count')

let productsQuery = knex
  .select(
    ...getSelect('products', 'product', productFields),
    ...getSelect('categories', 'category', categoryFields),
    variantsCountQuery
  )
  .from('products')
  .leftJoin('categories', 'products.category_id', 'categories.id')
  .whereNull('products.deleted_at')

const index = ex.createRoute(async (req, res) => {
  const keyword = _.defaultTo(req.search, '')
  const { limit } = req.query
  const { skip: offset } = req

  productsQuery = productsQuery.limit(limit).offset(offset)

  let countQuery = knex('products').whereNull('deleted_at')

  if (keyword.length > 0) {
    productsQuery = productsQuery.where('name', 'ilike', `%${keyword}%`)
    countQuery = countQuery.where('name', 'ilike', `%${keyword}%`)
  }

  countQuery = countQuery.count()

  let [products, [countRes]] = await Promise.all([productsQuery, countQuery])

  products = joinJs
    .map(products, relationMaps, 'productMap', 'product_')
    .map(({ variants, ...product }) => ({
      object: 'product',
      ...product,
      variants_count: Number(product.variants_count),
      category: {
        object: 'category',
        ...product.category
      }
    }))

  const pageCount = Math.ceil(countRes.count / limit)

  res.json({
    object: 'list',
    has_more: paginate.hasNextPages(req)(pageCount),
    data: products
  })
})

const show = ex.createRoute(async (req, res) => {
  const { id } = req.params
  const products = await productsQuery.where('products.id', id)

  const variantRelations = await knex('variants')
    .select(...getSelect('variants', 'variant', variantFields))
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

  res.json(product)
})

module.exports = {
  index,
  show
}
