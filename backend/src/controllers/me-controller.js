const knex = require('knex')(require('../config/knexfile'))
const joinJs = require('join-js').default

const ex = require('../utils/express')
const { NotFoundError } = require('../utils/db')
const { relationMaps } = require('../utils/db')
const { userTransformer } = require('../utils/transformers')

const index = ex.createRoute(async (req, res) => {
  const { id } = req.payload.sub

  let users = await knex('users')
    .select('*')
    .whereNull('deleted_at')
    .where('id', id)

  if (users.length === 0) {
    throw new NotFoundError('not found')
  }

  users = joinJs.mapOne(users, relationMaps, 'userMap', '')

  res.json(userTransformer(users))
})

module.exports = {
  index
}
