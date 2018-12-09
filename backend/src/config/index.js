let jwtSecret = process.env.JWT_SECRET

if (process.env.NODE_ENV === 'test') {
  jwtSecret = '!secret!'
}

const config = {
  PORT: Number(process.env.PORT) || 5000,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: jwtSecret,
  DATABASE_URL: process.env.DATABASE_URL
}

module.exports = config
