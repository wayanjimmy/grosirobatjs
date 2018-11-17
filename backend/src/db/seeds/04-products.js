const faker = require('faker')
const _ = require('lodash')

exports.seed = async function(knex, _Promise) {
  const categories = await knex.raw(
    `select * from categories order by random()`
  )
  const categoryIds = categories.rows.map(c => c.id)

  return knex('products').then(function() {
    const products = Array.from({ length: 10 }).map(() => {
      const randomIndex = _.random(0, categoryIds.length - 1)

      return {
        sku: _.padEnd(faker.random.number(100), 5, '0'),
        name: faker.commerce.productName(),
        category_id: categoryIds[randomIndex]
      }
    })
    return knex('products').insert(products)
  })
}
