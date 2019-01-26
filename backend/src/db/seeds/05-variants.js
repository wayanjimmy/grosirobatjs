const faker = require('faker')

const uoms = ['pcs', 'pox', 'pill']

exports.seed = async (knex, _Promise) => {
  let products = await knex.raw('select * from products')

  let variants = products.rows.map(product => {
    return {
      product_id: product.id,
      price: +faker.commerce.price(),
      scaled_quantity: 1,
      uom: uoms[Math.floor(Math.random() * uoms.length)]
    }
  })

  return knex('variants').insert(variants)
}
