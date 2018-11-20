require('dotenv').config()
const enableDestroy = require('server-destroy')

const config = require('./config')
const appInit = require('./app')
const logger = require('./utils/logger')(__filename)

const app = appInit()
const server = app.listen(config.PORT, () =>
  logger.info(
    `server listening on http://localhost:${config.PORT} in ${app.get('env')}`
  )
)
enableDestroy(server)

const closeServer = signal => {
  logger.info(`${signal} received`)
  logger.info('closing http server...')
  server.destroy()
}

process.on('SIGTERM', () => closeServer('SIGTERM'))
process.on('SIGINT', () => closeServer('SIGINT(Ctrl-C)'))

server.on('close', () => {
  logger.info('server closed.')
  process.emit('cleanup')
  logger.info('giving 100ms time to cleanup...')
  setTimeout(process.exit, 100)
})
