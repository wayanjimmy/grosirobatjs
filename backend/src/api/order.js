const { transaction } = require('objection')
const _ = require('lodash')

const orderSchema = require('../schemas/order')
const Order = require('../models/order')
const Variant = require('../models/variant')

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

async function index(req, res) {}

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
        ..._.omit(value, 'items')
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
  store
}
