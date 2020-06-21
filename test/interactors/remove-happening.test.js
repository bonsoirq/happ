const test = require('ava')
const RemoveHappening = require('../../src/interactors/remove-happening')
const Helper = require('../helper')
const Happening = require('../../src/entities/happening')
const { NOT_FOUND, UNAUTHORIZED } = require('../../src/enums/validation-error')

test('removes happening if exists and is authorized', async t => {
  const accountId = Helper.randomUUID

  const result = await new RemoveHappening({
    id: Helper.nilUUID,
    accountId
  }, {
    repository: {
      findById: async () => new Happening({ accountId }),
      remove: async () => true
    }
  }).call()

  t.true(result.isSuccess)
})

test('returns error if happening does not exist', async t => {
  const accountId = Helper.randomUUID

  const result = await new RemoveHappening({
    id: Helper.nilUUID,
    accountId
  }, {
    repository: {
      findById: async () => new Happening({ accountId }),
      remove: async () => false
    }
  }).call()

  t.true(result.isFailure)
  t.is(NOT_FOUND, result.reason())
})

test('returns error if user is not authorized', async t => {
  const result = await new RemoveHappening({
    id: Helper.nilUUID,
    accountId: Helper.nilUUID
  }, {
    repository: {
      findById: async () => new Happening({ accountId: Helper.randomUUID })
    }
  }).call()

  t.true(result.isFailure)
  t.is(UNAUTHORIZED, result.reason())
})
