const test = require('ava')
const CreateHappeningImage = require('../../src/interactors/create-happening-image')
const MockHappening = require('../mocks/happening')
const MockAccount = require('../mocks/account')
const Helper = require('../helper')
const { UNAUTHORIZED } = require('../../src/enums/validation-error')

test('fails when account is not authorized', async t => {
  const result = await new CreateHappeningImage({
    fileBuffer: null,
    extension: 'png',
    happeningId: Helper.nilUUID,
    accountId: Helper.nilUUID
  }, {
    accountRepository: { findById: async () => MockAccount() },
    happeningRepository: { findById: async () => MockHappening({ accountId: Helper.randomUUID }) }
  }).call()

  t.true(result.isFailure)
  t.is(UNAUTHORIZED, result.reason())
})

test('succeeds when account is authorized', async t => {
  const result = await new CreateHappeningImage({
    fileBuffer: null,
    extension: 'png',
    happeningId: Helper.nilUUID,
    accountId: Helper.nilUUID
  }, {
    accountRepository: { findById: async () => MockAccount() },
    happeningRepository: { findById: async () => MockHappening() },
    fileBufferRepository: { add: async () => null },
    repository: {
      add: async () => true,
      removeByHappeningId: async () => true
    }
  }).call()

  t.true(result.isSuccess)
})
