require('dotenv').config()
const { toInt } = require('./utils/to-int')

class Environment {
  static get isDevelopment () {
    const env = process.env.NODE_ENV
    return env === 'development' || env == null
  }

  static get isTesting () {
    const env = process.env.NODE_ENV
    return env === 'test'
  }

  static get webServerPort () {
    const DEFAULT_PORT = 3000
    return toInt(process.env.PORT || DEFAULT_PORT)
  }

  static get loggerEnabled () {
    return process.env.ENABLE_LOGGER === 'true'
  }

  static get uploadDirectory () {
    return process.env.UPLOAD_DIRECTORY
  }

  static get dbConnectionString () {
    const testDb = process.env.TEST_DB_CONNECTION_STRING
    const regularDb = process.env.DB_CONNECTION_STRING
    return this.isTesting ? testDb : regularDb
  }
}

class Auth {
  static get cookieName () { return '_happ_auth' }

  static get jwtSecret () {
    return process.env.JWT_SECRET
  }
}

module.exports = { Auth, Environment }
