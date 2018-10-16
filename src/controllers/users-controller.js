const paginate = require('express-paginate')
const Joi = require('joi')
const bcrypt = require('bcrypt')

const ex = require('../utils/express')
const { User } = require('../models')

const index = ex.createRoute(async (req, res) => {
  const { results: data, total } = await User.query()
    .orderBy('created_at', 'ASC')
    .range(req.skip, req.query.limit)

  const pageCount = Math.ceil(total / req.query.limit)

  res.json({
    object: 'list',
    has_more: paginate.hasNextPages(req)(pageCount),
    data: data.map(user => User.transform(user))
  })
})

const show = ex.createRoute(async (req, res) => {
  const { id } = req.params

  const data = await User.query()
    .findById(id)
    .throwIfNotFound()

  res.json(User.transform(data))
})

const store = ex.createRoute(async (req, res) => {
  const { error, value } = Joi.validate(
    req.body,
    Joi.object().keys({
      name: Joi.string()
        .required()
        .trim(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .trim()
    })
  )

  if (error && error.details) {
    console.log(error.details)
    throw error
  }

  const passwordDigest = bcrypt.hashSync(value.password, 10)

  const user = await User.query()
    .insert({
      name: value.name,
      email: value.email,
      password_digest: passwordDigest
    })
    .returning('*')
  res.json(User.transform(user))
})

module.exports = {
  index,
  show,
  store
}
