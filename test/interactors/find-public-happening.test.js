const test = require('ava')
const FindPublicHappening = require('../../src/interactors/find-public-happening')
const HappeningMock = require('../mocks/happening')
const { NOT_FOUND } = require('../../src/enums/validation-error')
const Helper = require('../helper')

test('fails when happening uuid is not valid', async t => {
  const happening = HappeningMock({ id: '1', isPublished: true })

  const result = await new FindPublicHappening({
    happeningId: happening.id
  }, {
    repository: {
      findById: async () => happening
    }
  }).call()

  t.true(result.isFailure)
  t.is(NOT_FOUND, result.reason())
})

test('fails when happening is not public', async t => {
  const happening = HappeningMock({ isPublished: false })

  const result = await new FindPublicHappening({
    happeningId: happening.id
  }, {
    repository: {
      findById: async () => happening
    }
  }).call()

  t.true(result.isFailure)
  t.is(NOT_FOUND, result.reason())
})

test('succeeds when happening is public', async t => {
  const happening = HappeningMock({ id: Helper.randomUUID, isPublished: true })

  const result = await new FindPublicHappening({
    happeningId: happening.id
  }, {
    repository: {
      findById: async () => happening
    }
  }).call()

  t.true(result.isSuccess)
})
