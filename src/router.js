const { Router } = require('express')

const { auth, users } = require('./controllers')
const authMiddleware = require('./middlewares/auth')

function createRouter() {
  const router = new Router()

  router.get('/', (_req, res) => res.json({ msg: 'Hello World!' }))

  router.post('/auth/login', auth.login)

  router.get('/users', authMiddleware.required, users.index)
  router.post('/users', authMiddleware.required, users.store)
  router.get('/users/:id', authMiddleware.required, users.show)
  router.put('/users/:id', authMiddleware.required, users.update)
  router.delete('/users/:id', authMiddleware.required, users.destroy)

  return router
}

module.exports = createRouter
