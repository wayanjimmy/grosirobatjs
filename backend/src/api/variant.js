const _ = require('lodash')

const Variant = require('../models/variant')
const variantSchema = require('../schemas/variant')

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
        .where('name', 'ilike', `%${query.search}%`)
        .from('products')
    })
  }

  if (_.has(query, 'productId')) {
    variants = variants.where('productId', query.productId)
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

async function store(req, res) {
  const value = await variantSchema.validate(req.body, {
    abortEarly: false,
    context: { store: true }
  })

  const variant = await Variant.query().insert(value)

  return res.json({ data: variant })
}

async function update(req, res) {
  const { id } = req.params

  const value = await variantSchema.validate(req.body, {
    abortEarly: false,
    context: { store: false }
  })

  const variant = await Variant.query().patchAndFetchById(id, value)

  res.json({ data: variant })
}

async function destroy(req, res) {
  const { id } = req.params

  const variant = await Variant.query()
    .delete()
    .where({ id })
    .first()
    .throwIfNotFound()
    .returning('*')

  res.json({ data: variant })
}

module.exports = {
  index,
  store,
  update,
  destroy
}
