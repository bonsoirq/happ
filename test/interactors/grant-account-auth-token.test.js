const test = require('ava')
const Account = require('../../src/entities/account')
const GrantAccountAuthToken = require('../../src/interactors/grant-account-auth-token')

test('generates JWT for valid account credentials', async t => {
  const account = new Account({
    name: 'John Appleseed',
    email: 'example@example.com'
  })

  const token = await GrantAccountAuthToken.call({
    email: 'example@example.com',
    password: 'valid-password'
  }, {
    repository: { findByEmail: async () => account },
    credentialsValidator: { call: async () => true }
  })

  t.is('string', typeof token)
})

test('returns null for invalid account credentials', async t => {
  const token = await GrantAccountAuthToken.call({
    email: 'example@example.com',
    password: 'invalid-password'
  }, {
    credentialsValidator: { call: async () => false }
  })

  t.is(null, token)
})
