const HappeningImage = require('../../src/entities/happening-image')
const { extend } = require('../../src/utils/extend')

const Helper = require('../helper')

const defaults = {
  id: Helper.nilUUID,
  happeningId: Helper.nilUUID,
  accountId: Helper.nilUUID,
  path: `${Helper.nilUUID}.png`
}

module.exports = function mock (attributes) {
  return new HappeningImage(extend(defaults, attributes))
}
