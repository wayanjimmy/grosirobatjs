const express = require('express')

const { users } = require('./controllers')

function createRouter() {
  const router = express.Router()

  router.get('/', (_req, res) => res.json({ msg: 'Hello World!' }))
  router.get('/users', users.index)

  return router
}

module.exports = createRouter
