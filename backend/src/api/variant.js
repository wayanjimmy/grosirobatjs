const _ = require('lodash')

const Variant = require('../models/variant')

const PAGE_SIZE = 10

async function getDefaultSelect() {
  const { columns } = await Variant.fetchTableMetadata()
  const set = new Set(columns)
  return [...set]
}

function getPageTotal(total, pageSize) {
  return Math.ceil(total / pageSize)
}

async function index({ query }, res) {
  query.page = Number(query.page) || 1
  query.pageSize = Number(query.pageSize) || PAGE_SIZE
  query.orderBy = query.orderBy || 'variants.createdAt'
  query.select = await getDefaultSelect()

  let variants = Variant.query()
    .select(query.select)
    .eager('[product]')
    .orderBy(query.orderBy, 'desc')
    .page(query.page - 1, query.pageSize)

  if (_.defaultTo(query.search, '').length > 0) {
    variants = variants.whereIn('product_id', builder => {
      builder
        .select('id')
        .where('name', 'like', `%${query.search}%`)
        .from('products')
    })
  }

  const { results, total } = await variants

  res.json({
    data: results,
    meta: {
      page: query.page,
      total,
      pageSize: query.pageSize,
      pageTotal: getPageTotal(total, query.pageSize)
    }
  })
}

module.exports = {
  index
}
