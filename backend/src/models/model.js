const Knex = require('knex')
const { DbErrors } = require('objection-db-errors')
const { knexSnakeCaseMappers, Model } = require('objection')

const knexConfig = require('../config/knexfile')

class BaseModel extends DbErrors(Model) {
  static useLimitInFirst = true

  $beforeInsert() {
    this.createdAt = new Date().toISOString()
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString()
  }
}

const knex = Knex({ ...knexConfig, ...knexSnakeCaseMappers() })

BaseModel.knex(knex)

module.exports = BaseModel
