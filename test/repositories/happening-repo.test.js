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

test.serial('#add inserts data', async t => {
  const isSuccess = await HappeningRepo.add(new Happening({
    name: 'Fantastic Event',
    accountId: Helper.nilUUID,
    description: 'The best event you are going to experience',
    organizerDescription: 'By John Appleseed',
    agenda: '10AM to 1PM @ the library'
  }))

  t.true(isSuccess)
})
