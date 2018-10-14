const paginate = require('express-paginate')
const R = require('ramda')

const { User } = require('../models')

async function index(req, res) {
  const { results: data, total } = await User.query()
    .orderBy('created_at', 'ASC')
    .range(req.skip, req.query.limit)

  const pageCount = Math.ceil(total / req.query.limit)

  res.json({
    object: 'list',
    has_more: paginate.hasNextPages(req)(pageCount),
    data: data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    }))
  })
}

module.exports = {
  index
}
