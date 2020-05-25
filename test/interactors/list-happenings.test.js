const test = require('ava')
const ListHappenings = require('../../src/interactors/list-happenings')
const Happening = require('../../src/entities/happening')
const Helper = require('../helper')

test('returns entities returned by repository', async t => {
  const accountId = Helper.randomUUID
  const happenings = await new ListHappenings({ accountId }, {
    repository: { findByAccountId: async () => [new Happening({ accountId })] }
  }).call()

  t.is(happenings.length, 1)
})
