const { resolve, join } = require('path')
const ROOT = resolve(__dirname, '../../')
require('dotenv-safe').config({
  path: join(ROOT, '.env'),
  example: join(ROOT, '.env.example')
})

const config = require('./index')

const options = {
  client: 'pg',
  connection: `${config.DB_URL}`,
  migrations: {
    directory: join(ROOT, 'src/db/migrations'),
    tableName: 'migrations'
  },
  debug: false,
  pool: {
    min: 2,
    max: 10
  }
}

if (config.NODE_ENV !== 'production') {
  options.seeds = {
    directory: join(ROOT, 'src/db/seeds')
  }
}

module.exports = options
