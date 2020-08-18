const test = require('ava')
const HappeningImageMock = require('../mocks/happening-image')
const HappeningImageRepo = require('../../src/repositories/happening-image-repo')
const HappeningImage = require('../../src/entities/happening-image')
const Helper = require('../helper')
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

test.serial('#findByHappeningId finds entity', async t => {
  const happeningId = HappeningImageMock().happeningId

  const happeningImage = await HappeningImageRepo.findByHappeningId(happeningId)

  t.true(happeningImage instanceof HappeningImage)
  t.deepEqual(happeningImage, HappeningImageMock())
})

test.serial('#findByHappeningId return null for invalid id', async t => {
  const happeningImage = await HappeningImageRepo.findByHappeningId(Helper.randomUUID)

  t.is(null, happeningImage)
})

test.serial('#removeByHappeningId return null for invalid id', async t => {
  const happeningId = HappeningImageMock().happeningId

  const isSuccess = await HappeningImageRepo.removeByHappeningId(happeningId)

  t.true(isSuccess)
})
