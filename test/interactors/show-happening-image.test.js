const test = require('ava')
const ShowHappeningImage = require('../../src/interactors/show-happening-image')
const MockHappening = require('../mocks/happening')
const MockAccount = require('../mocks/account')
const MockHappeningImage = require('../mocks/happening-image')
const Helper = require('../helper')
const { UNAUTHORIZED } = require('../../src/enums/validation-error')

test('fails when account is not authorized', async t => {
  const result = await new ShowHappeningImage({
    happeningId: Helper.nilUUID,
    accountId: Helper.nilUUID
  }, {
    accountRepository: { findById: async () => MockAccount() },
    happeningRepository: { findById: async () => MockHappening({ accountId: Helper.randomUUID, isPublished: false }) }
  }).call()

  t.true(result.isFailure)
  t.is(UNAUTHORIZED, result.reason())
})

test('succeeds when account is authorized', async t => {
  const result = await new ShowHappeningImage({
    happeningId: Helper.nilUUID,
    accountId: Helper.nilUUID
  }, {
    accountRepository: { findById: async () => MockAccount() },
    happeningRepository: { findById: async () => MockHappening() },
    fileBufferRepository: { path: () => 'imagepath' },
    repository: { findByHappeningId: async () => MockHappeningImage() }
  }).call()

  t.true(result.isSuccess)
  t.is('string', typeof result.value())
})

test('fails when account is authorized but image has not been uploaded', async t => {
  const result = await new ShowHappeningImage({
    happeningId: Helper.nilUUID,
    accountId: Helper.nilUUID
  }, {
    accountRepository: { findById: async () => MockAccount() },
    happeningRepository: { findById: async () => MockHappening() },
    fileBufferRepository: { path: async () => 'imagepath' },
    repository: { findByHappeningId: async () => null }
  }).call()

  t.true(result.isFailure)
})
