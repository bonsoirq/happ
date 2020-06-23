const test = require('ava')
const HappeningImageMock = require('../mocks/happening-image')
const HappeningImageRepo = require('../../src/repositories/happening-image-repo')
const { slonik, sql } = require('../../src/db/connection-pool')

test.after(async t => {
  await slonik.query(sql`
    TRUNCATE TABLE happening_images;
  `)
})

test.serial('#add inserts data', async t => {
  const isSuccess = await HappeningImageRepo.add(HappeningImageMock())

  t.true(isSuccess)
})
