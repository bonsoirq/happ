const test = require('ava')
const PublishHappening = require('../../src/interactors/publish-happening')
const HappeningMock = require('../mocks/happening')
const Helper = require('../helper')
const { UNAUTHORIZED } = require('../../src/enums/validation-error')

test('publishes happening when authorized', async t => {
  const happening = HappeningMock()

  const result = await new PublishHappening({
    happeningId: happening.id,
    accountId: happening.accountId,
    isPublished: true
  }, {
    repository: {
      findById: async () => HappeningMock(),
      update: async () => true
    }
  }).call()

  t.true(result.isSuccess)
})

test('fails when not authorized', async t => {
  const happening = HappeningMock()

  const result = await new PublishHappening({
    happeningId: happening.id,
    accountId: Helper.randomUUID,
    isPublished: true
  }, {
    repository: {
      findById: async () => HappeningMock(),
      update: async () => true
    }
  }).call()

  t.true(result.isFailure)
  t.is(UNAUTHORIZED, result.reason())
})
