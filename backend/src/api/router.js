const Router = require('express-promise-router')
const _ = require('lodash')
const jwt = require('express-jwt')

const config = require('../config')
const auth = require('./auth')
const authUtil = require('../utils/auth')
const product = require('./product')
const category = require('./category')
const variant = require('./variant')
const order = require('./order')
const errTypes = require('../errors')
const logger = require('../utils/logger')(__filename)

const authMiddleware = {
  required: jwt({
    secret: config.JWT_SECRET,
    userProperty: 'payload',
    getToken: authUtil.getTokenFromHeader
  })
}

const router = new Router()

router.get('/', async (_req, res) => {
  res.json({ message: 'Hello World!' })
})

router.post('/auth/login', auth.login)
router.get('/auth/me', authMiddleware.required, auth.me)

router.get('/products', authMiddleware.required, product.index)
router.post('/products', authMiddleware.required, product.store)
router.get('/products/:id', authMiddleware.required, product.show)
router.put('/products/:id', authMiddleware.required, product.update)

router.get('/variants', authMiddleware.required, variant.index)
router.post('/variants', authMiddleware.required, variant.store)
router.put('/variants/:id', authMiddleware.required, variant.update)
router.delete('/variants/:id', authMiddleware.required, variant.destroy)

router.get('/categories', authMiddleware.required, category.index)

router.get('/orders', authMiddleware.required, order.index)
router.post('/orders', authMiddleware.required, order.store)
router.get('/orders/:no', authMiddleware.required, order.show)

router.get('*', async (_req, _res) => {
  const err = new Error('404 not found')
  err.status = 404
  throw err
})

router.use(async (err, _req, res, _next) => {
  augmentObjectionError(err)

  const { message, stack, code = null, status = null, details = {} } = err
  logger.error(stack)

  res.status(Number(err.status) || 500).json({ message, code, status, details })
})

function augmentObjectionError(err, res) {
  if (err instanceof errTypes.ValidationError) {
    err.status = 422
    err.code = 'VALIDATION_ERROR'
    err.details = formatValidationError(err)
  } else if (err instanceof errTypes.NotFoundError) {
    err.status = 404
    err.code = 'NOT_FOUND'
  } else if (err instanceof errTypes.UniqueViolationError) {
    err.status = 409
    err.code = 'UNIQUE_VIOLATION'
  } else if (err instanceof errTypes.NotNullViolationError) {
    err.status = 400
    err.code = 'NOT_NULL_VIOLATION'
  } else if (err instanceof errTypes.ForeignKeyViolationError) {
    err.status = 409
    err.code = 'FOREIGN_KEY_VIOLATION'
  } else if (err instanceof errTypes.CheckViolationError) {
    err.status = 400
    err.code = 'CHECK_VIOLATION'
  } else if (err instanceof errTypes.ConstraintViolationError) {
    err.status = 409
    err.code = 'UNKNOWN_CONSTRAINT_VIOLATION'
  } else if (err instanceof errTypes.DataError) {
    err.status = 400
    err.code = 'UNKNOWN_DATA_ERROR'
  } else if (err instanceof errTypes.DBError) {
    err.status = 500
    err.code = 'UNKNOWN_DB_ERROR'
  }
}

function formatValidationError(err) {
  const result = {}
  if (err.path) {
    result[err.path] = [_.defaultTo(err.message, 'is not valid')]
  }
  if (err.inner && err.inner.length > 0) {
    err.inner
      .map(err => formatValidationError(err))
      .reduce((prev, curr) => Object.assign(prev, curr), result)
  }
  return result
}

module.exports = router
