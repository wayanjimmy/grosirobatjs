const { Router } = require('express')

const { auth, users, categories, me, distributors } = require('./controllers')
const authMiddleware = require('./middlewares/auth')

function createRouter() {
  const router = new Router()

  router.get('/', (_req, res) => res.json({ msg: 'Hello World!' }))

  router.post('/auth/login', auth.login)

  router.get('/me', authMiddleware.required, me.index)

  router.get('/users', authMiddleware.required, users.index)
  router.post('/users', authMiddleware.required, users.store)
  router.get('/users/:id', authMiddleware.required, users.show)
  router.put('/users/:id', authMiddleware.required, users.update)
  router.delete('/users/:id', authMiddleware.required, users.destroy)

  router.get('/categories', authMiddleware.required, categories.index)
  router.post('/categories', authMiddleware.required, categories.store)
  router.get('/categories/:id', authMiddleware.required, categories.show)
  router.put('/categories/:id', authMiddleware.required, categories.update)
  router.delete('/categories/:id', authMiddleware.required, categories.destroy)

  router.get('/distributors', authMiddleware.required, distributors.index)
  router.post('/distributors', authMiddleware.required, distributors.store)
  router.get('/distributors/:id', authMiddleware.required, distributors.show)
  router.put('/distributors/:id', authMiddleware.required, distributors.update)
  router.delete(
    '/distributors/:id',
    authMiddleware.required,
    distributors.destroy
  )

  return router
}

module.exports = createRouter
