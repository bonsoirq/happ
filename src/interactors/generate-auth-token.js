const jwt = require('jsonwebtoken')
const Interactor = require('./interactor')
const { Auth } = require('../config')

class GenerateAuthToken extends Interactor {
  constructor ({ resourceId, expiresAt, secret = Auth.jwtSecret }) {
    super()
    this.resourceId = resourceId
    this.secret = secret
    this.expiresAt = expiresAt
  }

  async call () {
    return jwt.sign({
      sub: this.resourceId,
      exp: Math.floor(this.expiresAt / 1000)
    }, this.secret)
  }
}

module.exports = GenerateAuthToken
