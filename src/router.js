const { Router } = require('express')

const { auth, users } = require('./controllers')

function createRouter() {
  const router = new Router()

  router.get('/', (_req, res) => res.json({ msg: 'Hello World!' }))

  router.post('/auth/login', auth.login)

  router.get('/users', users.index)
  router.post('/users', users.store)
  router.get('/users/:id', users.show)
  router.put('/users/:id', users.update)
  router.delete('/users/:id', users.destroy)

  return router
}

module.exports = createRouter
