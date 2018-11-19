const { transaction } = require('objection')
const _ = require('lodash')

const Product = require('../models/product')
const productSchema = require('../schemas/product')

const PAGE_SIZE = 10

async function getDefaultSelect() {
  const { columns } = await Product.fetchTableMetadata()
  const set = new Set(columns)
  return [...set]
}

function getPageTotal(total, pageSize) {
  return Math.ceil(total / pageSize)
}

async function index({ query }, res) {
  query.page = Number(query.page) || 1
  query.page -= 1
  query.pageSize = Number(query.pageSize) || PAGE_SIZE
  query.orderBy = query.orderBy || 'sku'
  query.select = await getDefaultSelect()

  let products = Product.query()
    .eager('category')
    .select(
      ...query.select,
      Product.relatedQuery('variants')
        .count()
        .as('numberOfVariants')
    )
    .orderBy(query.orderBy, 'desc')
    .page(query.page, query.pageSize)

  if (_.defaultTo(query.search, '').length > 0) {
    products = products.where('name', 'like', `%${query.search}%`)
  }

  const { results, total } = await products

  res.json({
    data: results,
    meta: {
      page: query.page + 1,
      total,
      pageSize: query.pageSize,
      pageTotal: getPageTotal(total, query.pageSize)
    }
  })
}

async function store(req, res) {
  value = await productSchema.validate(req.body, { abortEarly: false })

  console.log(value)

  const Knex = Product.knex()

  let trx
  try {
    trx = await transaction.start(Knex)

    const product = await Product.query(trx)
      .eager('category')
      .insert(_.omit(value, 'variants'))

    for (const variant of value.variants) {
      await product.$relatedQuery('variants', trx).insert(variant)
    }

    await trx.commit()

    res.json({ data: product })
  } catch (error) {
    await trx.rollback()

    console.error(error)

    throw new Error('something wrong')
  }
}

module.exports = {
  index,
  store
}
