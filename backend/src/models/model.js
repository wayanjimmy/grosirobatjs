const Knex = require('knex')
const Debug = require('debug')
const { DbErrors } = require('objection-db-errors')
const { knexSnakeCaseMappers, Model } = require('objection')

const knexConfig = require('../config/knexfile')
const debug = Debug('apotek:model')

class BaseModel extends DbErrors(Model) {
  static useLimitInFirst = true

  static query(...args) {
    return super.query(...args).runAfter((models, query) => {
      debug(query.toString())
      return models
    })
  }

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
