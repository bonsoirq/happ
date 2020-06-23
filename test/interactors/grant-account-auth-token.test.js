const test = require('ava')
const MockAccount = require('../mocks/account')
const GrantAccountAuthToken = require('../../src/interactors/grant-account-auth-token')

test('generates JWT for valid account credentials', async t => {
  const result = await GrantAccountAuthToken.call({
    email: 'example@example.com',
    password: 'valid-password'
  }, {
    repository: { findByEmail: async () => MockAccount() },
    credentialsValidator: { call: async () => true }
  })

  t.is('string', typeof result.value())
})

test('returns null for invalid account credentials', async t => {
  const result = await GrantAccountAuthToken.call({
    email: 'example@example.com',
    password: 'invalid-password'
  }, {
    credentialsValidator: { call: async () => false }
  })

  t.true(result.isFailure)
})
