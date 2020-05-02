const uuid = require('../utils/uuid')

class Account {
  constructor ({ id, name, email, password }) {
    this.id = id || uuid.generate()
    this.name = name
    this.email = email
    this.password = password
  }
}

module.exports = Account
