const knex = require('knex')
const { Model } = require('objection')

const connection = require('../config/knexfile')

const knexConn = knex(connection)

Model.knex(knexConn)

class User extends Model {
  static get tableName() {
    return 'users'
  }
}

module.exports = {
  User
}
