const { resolve, join } = require('path')
const ROOT = resolve(__dirname, '../../')
require('dotenv').config({
  path: join(ROOT, '.env')
})

const config = require('./index')

const options = {
  client: 'pg',
  connection: `${config.DATABASE_URL}`,
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

if (true) {
  options.seeds = {
    directory: join(ROOT, 'src/db/seeds')
  }
}

module.exports = options
