const path = require('path')
const dotenv = require('dotenv')

const ROOT = path.resolve(__dirname, '../../')

dotenv.config({ path: path.join(ROOT, '.env') })

const options = {
  client: 'pg',
  connection: `${process.env.DB_URL}`,
  migrations: {
    directory: path.join(ROOT, 'src/db/migrations'),
    tableName: 'migrations'
  },
  debug: false,
  seeds: {
    directory: path.join(ROOT, 'src/db/seeds')
  },
  pool: {
    min: 2,
    max: 10
  }
}

module.exports = options
