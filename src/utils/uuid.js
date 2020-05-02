const uuid = require('uuid')

function generate () {
  return uuid.v4()
}

module.exports = { generate }
