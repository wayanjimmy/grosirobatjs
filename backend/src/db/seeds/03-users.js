const faker = require('faker')
const bcrypt = require('bcrypt')

exports.seed = async function(knex, _Promise) {
  return knex('users').then(function() {
    const users = Array.from({ length: 10 }).map(() => ({
      name: faker.name.findName(),
      email: faker.internet.email().toLowerCase(),
      password_digest: bcrypt.hashSync('secret', 10),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))

    users.push({
      name: 'Admin',
      email: 'admin@grosirobat.com',
      password_digest: bcrypt.hashSync('secret', 10),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })

    return knex('users').insert(users)
  })
}
