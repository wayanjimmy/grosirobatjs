const { Router } = require('express')

const { users } = require('./controllers')

function createRouter() {
  const router = new Router()

  router.get('/', (_req, res) => res.json({ msg: 'Hello World!' }))
  router.get('/users', users.index)
  router.get('/users/:id', users.show)
  router.post('/users', users.store)

  return router
}

module.exports = createRouter
