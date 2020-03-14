require('dotenv').config()
const { toInt } = require('./utils')

class Environment {
  static isDevelopment () {
    const env = process.env.NODE_ENV
    return env === 'development' || env == null
  }

  static webServerPort () {
    const DEFAULT_PORT = 3000
    return toInt(process.env.PORT || DEFAULT_PORT)
  }
}

module.exports = { Environment }
