const paginate = require('express-paginate')

const { User } = require('../models')
const {throwIf, throwError, sendError} = require('../utils/error-helper')

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
  try {
    const { id } = req.params

    const data = await User.query()
      .findById(id)
      .throwIfNotFound()
      .then(
        throwIf(r => !r, 404, 'not found', 'User Not Found'),
        throwError(500, 'error load data from source')
      )

    res.json(User.transform(data))
  } catch (err) {
    sendError(res)(err)
  }
}

async function store(req, res) {
  const user = await User.query()
    .insert(req.body)
    .returning('*')
  res.json(User.transform(user))
}

module.exports = {
  index,
  show,
  store
}
