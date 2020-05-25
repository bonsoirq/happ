const uuid = require('../src/utils/uuid')

class Helper {
  static get nilUUID () { return '00000000-0000-0000-0000-000000000000' }
  static get randomUUID () { return uuid.generate() }
}

module.exports = Helper
