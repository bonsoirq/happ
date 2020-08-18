const uuid = require('../utils/uuid')

class HappeningImage {
  constructor ({ id, happeningId, path }) {
    this.id = id || uuid.generate()
    this.happeningId = happeningId
    this.path = path
  }
}

module.exports = HappeningImage
