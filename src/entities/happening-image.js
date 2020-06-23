const uuid = require('../utils/uuid')

class HappeningImage {
  constructor ({ id, happeningId, accountId, path }) {
    this.id = id || uuid.generate()
    this.happeningId = happeningId
    this.accountId = accountId
    this.path = path
  }
}

module.exports = HappeningImage
