const faker = require('faker')

exports.seed = function(knex, _Promise) {
  return knex('distributors').then(() => {
    const distributors = Array.from({ length: 10 }).map(() => ({
      name: faker.name.findName(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))

    return knex('distributors').insert(distributors)
  })
}
