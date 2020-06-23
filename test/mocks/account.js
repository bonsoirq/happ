const Account = require('../../src/entities/account')
const { extend } = require('../../src/utils/extend')

const Helper = require('../helper')

const defaults = {
  id: Helper.nilUUID,
  name: 'Account Name',
  email: 'example@example.com',
  password: '###SECRET###'
}

module.exports = function mock (attributes) {
  return new Account(extend(defaults, attributes))
}
