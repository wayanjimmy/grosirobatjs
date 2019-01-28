const { transaction } = require('objection')
const _ = require('lodash')

const orderSchema = require('../schemas/order')
const Order = require('../models/order')
const Variant = require('../models/variant')

const PAGE_SIZE = 10

async function getDefaultSelect() {
  const { columns } = await Order.fetchTableMetadata()
  const set = new Set(columns)
  return [...set]
}

function getPageTotal(total, pageSize) {
  return Math.ceil(total / pageSize)
}

async function generateOrderNo() {
  let d = new Date()
  let prefix =
    d.getDate() +
    (d.getMonth() + 1) +
    d.getFullYear() +
    d.getHours() +
    d.getMinutes()

  for (let i = 0; i < 10; i++) {
    const no = prefix + _.padStart(_.random(1, 999), 3, '0')

    const [{ count }] = await Order.query()
      .where({ no })
      .count()

    if (+count === 0) {
      return no
    }
  }

  return false
}

async function index({ query }, res) {
  query.page = Number(query.page) || 1
  query.pageSize = Number(query.pageSize) || PAGE_SIZE
  query.orderBy = query.orderBy || 'orders.createdAt'
  query.select = await getDefaultSelect()

  let orders = Order.query()
    .select(query.select)
    .orderBy(query.orderBy, 'desc')
    .page(query.page - 1, query.pageSize)

  if (_.defaultTo(query.search, '').length > 0) {
    orders = orders
      .where('no', 'ilike', `%${query.search}%`)
      .orWhere('customerName', 'ilike', `%${query.search}%`)
  }

  const { results, total } = await orders

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

async function show(req, res) {
  const { no } = req.params

  const order = await Order.query()
    .where({ no })
    .first()
    .throwIfNotFound()

  const items = await order
    .$relatedQuery('items')
    .eager('[variant, variant.product]')
  order.items = items

  res.json({ data: order })
}

async function store(req, res) {
  const value = await orderSchema.validate(req.body, { abortEarly: false })

  const Knex = Order.knex()

  let trx
  try {
    trx = await transaction.start(Knex)

    const no = await generateOrderNo()

    let totalAmount = 0
    for (const item of value.items) {
      const variant = await Variant.query()
        .where({ id: item.variantId })
        .first()
      totalAmount += variant.price * item.quantity
    }

    const order = await Order.query(trx)
      .eager('items')
      .insert({
        no,
        totalAmount,
        ..._.omit(value, 'items'),
        paidAt: new Date().toISOString()
      })
      .returning('*')

    for (const item of value.items) {
      await order.$relatedQuery('items', trx).insert(item)
    }

    await trx.commit()

    res.json({ data: order })
  } catch (error) {
    await trx.rollback()
    throw error
  }
}

module.exports = {
  index,
  show,
  store
}
