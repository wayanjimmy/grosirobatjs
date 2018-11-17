const Product = require('../models/product')

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
  query.page = Number(query.page) || 0
  query.pageSize = Number(query.pageSize) || PAGE_SIZE
  query.orderBy = query.orderBy || 'sku'
  query.select = await getDefaultSelect()

  const { total, results } = await Product.query()
    .eager('category')
    .select(query.select)
    .orderBy(query.orderBy, 'desc')
    .range(query.page, query.pageSize)

  res.json({
    data: results,
    meta: {
      total,
      pageSize: query.pageSize,
      pageTotal: getPageTotal(total, query.pageSize)
    }
  })
}

module.exports = {
  index
}
