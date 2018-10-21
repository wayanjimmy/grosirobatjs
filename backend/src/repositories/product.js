const knex = require('knex')(require('../config/knexfile'))

function getAll(keyword, offset, limit) {
  let productQuery = knex
    .select('*')
    .from('products')
    .whereNull('deleted_at')
    .orderBy('created_at', 'ASC')

  if (keyword.length > 0) {
    productQuery = productQuery.where('name', 'ilike', `%${keyword}%`)
  }

  if (offset) {
    productQuery = productQuery.offset(offset)
  }

  if (limit) {
    productQuery = productQuery.limit(limit)
  }

  return productQuery
}

module.exports = {
  getAll
}
