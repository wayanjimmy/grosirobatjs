const paginate = require('express-paginate')

const { User } = require('../models')

async function index(req, res) {
  const { results: data, total } = await User.query()
    .orderBy('created_at', 'ASC')
    .range(req.skip, req.query.limit)

  const pageCount = Math.ceil(total / req.query.limit)

  res.json({
    object: 'list',
    has_more: paginate.hasNextPages(req)(pageCount),
    data: data.map(user => User.transform(user))
  })
}

async function show(req, res) {
  const { id } = req.params
  const data = await User.query().findById(id)

  res.json({
    ...User.transform(data)
  })
}

module.exports = {
  index,
  show
}
