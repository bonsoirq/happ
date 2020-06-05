const test = require('ava')
const Account = require('../../src/entities/account')
const ShowAccount = require('../../src/interactors/show-account')
const Helper = require('../helper')

test('succeeds for valid accountId', async t => {
  const expected = { id: Helper.nilUUID, name: 'John Doe', email: 'example@example.com' }

  const result = await new ShowAccount({ accountId: Helper.nilUUID }, {
    repository: {
      findById: async () => new Account(expected)
    }
  }).call()

  t.true(result.isSuccess)
  t.deepEqual(expected, result.value())
})

test('fails for invalid accountId', async t => {
  const result = await new ShowAccount({ accountId: Helper.randomUUID }, {
    repository: {
      findById: async () => null
    }
  }).call()

  t.true(result.isFailure)
})
