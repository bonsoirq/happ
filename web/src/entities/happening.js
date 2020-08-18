export default class Happening {
  constructor ({ id, name, accountId, description, organizerDescription, agenda, isPublished }) {
    this.id = id
    this.name = name
    this.accountId = accountId
    this.description = description
    this.organizerDescription = organizerDescription
    this.agenda = agenda
    this.isPublished = isPublished
  }
}
