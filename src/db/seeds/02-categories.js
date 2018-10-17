const faker = require('faker')

exports.seed = function(knex, Promise) {
  return knex('categories')
    .del()
    .then(function() {
      const categories = Array.from({ length: 10 }).map(() => ({
        name: faker.name.findName(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }))
      return knex('categories').insert(categories)
    })
}
