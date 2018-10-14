const express = require('express')

const { users } = require('./controllers')

const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

function createRouter() {
  const router = express.Router()

  router.get('/', (_req, res) => res.json({ msg: 'Hello World!' }))
  router.get('/users', asyncHandler(users.index))
  router.get('/users/:id', asyncHandler(users.show))
  router.post('/users', asyncHandler(users.store))

  return router
}

module.exports = createRouter
