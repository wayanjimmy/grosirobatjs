require('dotenv').config()
const enableDestroy = require('server-destroy')

const logger = require('./utils/logger')(__filename)
const config = require('./config')
const createApp = require('./app')

const app = createApp()
const server = app.listen(config.PORT, () =>
  logger.info(
    `Server listening on http://localhost:${config.PORT} in ${app.get('env')}`
  )
)
enableDestroy(server)

const closeServer = signal => {
  logger.info(`${signal} received.`)
  logger.info(`Closing http server ...`)
  server.destroy()
}

process.on('SIGTERM', () => closeServer('SIGTERM'))
process.on('SIGINT', () => closeServer('SIGINT(Ctrl-C)'))

server.on('close', () => {
  logger.info('Server closed.')

  process.emit('cleanup')

  logger.info('Giving 100ms time to cleanup ...')
  setTimeout(process.exit, 100)
})
