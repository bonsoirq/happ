const test = require('ava')
const fs = require('fs').promises
const { isFileExt } = require('../../src/utils/is-file-ext')
const { PNG, JPG } = require('../../src/enums/file-ext')

test('returns false for png file and jpg extension', async t => {
  const pngBuffer = await fs.readFile('./test/fixtures/png-image.png')
  const isJpg = await isFileExt(pngBuffer, JPG)

  t.false(isJpg)
})

test('returns true for png file when png is one of given extensions', async t => {
  const fileBuffer = await fs.readFile('./test/fixtures/png-image.png')
  const isPng = await isFileExt(fileBuffer, JPG, PNG)

  t.true(isPng)
})

test('rejects for unsupported file type', async t => {
  const fileBuffer = await fs.readFile('./test/fixtures/text')
  await t.throwsAsync(async () => await isFileExt(fileBuffer, JPG))
})
