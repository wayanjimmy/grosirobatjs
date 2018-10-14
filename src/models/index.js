const knex = require('knex')
const { Model } = require('objection')

const connection = require('../config/knexfile')

const knexConn = knex(connection)

Model.knex(knexConn)

class User extends Model {
  static get tableName() {
    return 'users'
  }

  static transform(user) {
    return {
      object: 'customer',
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    }
  }
}

module.exports = {
  User
}
