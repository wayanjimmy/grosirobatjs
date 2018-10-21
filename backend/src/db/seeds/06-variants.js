const faker = require('faker')

exports.seed = function(knex, _Promise) {
  return knex('variants').then(async function() {
    const res = await knex.raw(`select * from products order by random()`)
    const products = res.rows

    const variants = products.map(product => ({
      product_id: product.id,
      price: faker.commerce.price(5000, 100000),
      scaled_quantity: faker.random.number({ min: 1, max: 10 }),
      unit_of_measure: 'pcs'
    }))

    return knex('variants').insert(variants)
  })
}
