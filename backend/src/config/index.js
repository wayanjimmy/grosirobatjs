const config = {
  PORT: Number(process.env.PORT) || 9000,
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: process.env.LOG_LEVEL,

  JWT_SECRET: process.env.JWT_SECRET || 'secret'
}

module.exports = config
