const uuid = require('../utils/uuid')

class Happening {
  constructor ({ id, name, accountId, description, organizerDescription, agenda, isPublished = false }) {
    this.id = id || uuid.generate()
    this.name = name
    this.accountId = accountId
    this.description = description
    this.organizerDescription = organizerDescription
    this.agenda = agenda
    this.isPublished = isPublished
  }
}

module.exports = Happening
