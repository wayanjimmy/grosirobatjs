const faker = require('faker')
const _ = require('lodash')

exports.seed = async function(knex, _Promise) {
  const categories = await knex.raw(
    `select * from categories order by random()`
  )
  const categoryIds = categories.rows.map(c => c.id)

  return knex('products').then(function() {
    const products = Array.from({ length: 50 }).map(() => {
      const randomIndex = _.random(0, categoryIds.length - 1)

      return {
        name: faker.name.findName(),
        category_id: categoryIds[randomIndex]
      }
    })
    return knex('products').insert(products)
  })
}
