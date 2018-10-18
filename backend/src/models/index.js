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
      object: 'user',
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    }
  }
}

class Category extends Model {
  static get tableName() {
    return 'categories'
  }

  static transform(category) {
    return {
      object: 'category',
      id: category.id,
      name: category.name,
      created_at: category.created_at,
      updated_at: category.updated_at
    }
  }
}

class Distributor extends Model {
  static get tableName() {
    return 'distributors'
  }

  static transform(distributor) {
    return {
      object: 'distributor',
      id: distributor.id,
      name: distributor.name
    }
  }
}

module.exports = {
  User,
  Category,
  Distributor
}
