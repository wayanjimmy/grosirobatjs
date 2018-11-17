require('dotenv-safe').config()
const enableDestroy = require('server-destroy')

const config = require('./config')
const appInit = require('./app')

const app = appInit()
const server = app.listen(config.PORT, () =>
  console.log(
    `server listening on http://localhost:${config.PORT} in ${app.get('env')}`
  )
)
enableDestroy(server)

const closeServer = signal => {
  console.log(`${signal} received`)
  console.log('closing http server...')
  server.destroy()
}

process.on('SIGTERM', () => closeServer('SIGTERM'))
process.on('SIGINT', () => closeServer('SIGINT(Ctrl-C)'))

server.on('close', () => {
  console.log('server closed.')
  process.emit('cleanup')
  console.log('giving 100ms time to cleanup...')
  setTimeout(process.exit, 100)
})
