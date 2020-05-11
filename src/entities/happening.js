const uuid = require('../utils/uuid')

class Happening {
  constructor ({ id, name, accountId, description, organizerDescription, agenda }) {
    this.id = id || uuid.generate()
    this.name = name
    this.accountId = accountId
    this.description = description
    this.organizerDescription = organizerDescription
    this.agenda = agenda
  }
}

module.exports = Happening
