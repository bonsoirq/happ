const Happening = require('../../src/entities/happening')
const { extend } = require('../../src/utils/extend')

const Helper = require('../helper')

const defaults = {
  id: Helper.nilUUID,
  name: 'Fantastic Event',
  accountId: Helper.nilUUID,
  description: 'The best event you are going to experience',
  organizerDescription: 'By John Appleseed',
  agenda: '10AM to 1PM @ the library',
  isPublished: true
}

module.exports = function mock (attributes) {
  return new Happening(extend(defaults, attributes))
}
