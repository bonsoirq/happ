const test = require('ava')
const Happening = require('../../src/entities/happening')
const HappeningRepo = require('../../src/repositories/happening-repo')
const { slonik, sql } = require('../../src/db/connection-pool')
const Helper = require('../helper')

test.after(async t => {
  await slonik.query(sql`
    TRUNCATE TABLE happenings;
  `)
})

test.before(t => {
  t.context.happening = new Happening({
    name: 'Fantastic Event',
    accountId: Helper.nilUUID,
    description: 'The best event you are going to experience',
    organizerDescription: 'By John Appleseed',
    agenda: '10AM to 1PM @ the library'
  })
})

test.serial('#add inserts data', async t => {
  const isSuccess = await HappeningRepo.add(t.context.happening)

  t.true(isSuccess)
})

test.serial('#findByAccountId find entities with this Id', async t => {
  const entities = await HappeningRepo.findByAccountId(t.context.happening.accountId)

  t.true(Array.isArray(entities))
  t.is(entities.length, 1)

  const [entity] = entities

  t.true(entity instanceof Happening)
  t.is(entity.accountId, t.context.happening.accountId)
})

test.serial('#findByAccountId find nothing for other Id', async t => {
  const entities = await HappeningRepo.findByAccountId(Helper.randomUUID)

  t.true(Array.isArray(entities))
  t.is(entities.length, 0)
})
