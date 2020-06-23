const test = require('ava')
const fs = require('fs').promises
const path = require('path')
const os = require('os')
const FileBufferRepo = require('../../src/repositories/file-buffer-repo')

test.before(async t => {
  const dirPath = path.join(os.tmpdir(), 'file-buffer-')
  t.context.dir = await fs.mkdtemp(dirPath)
  FileBufferRepo.root = t.context.dir

  t.context.originalBuffer = await fs.readFile('./test/fixtures/png-image.png')
})

test.serial('#add saves given buffer as file with given name', async t => {
  const fileName = 'saved-image.png'
  await FileBufferRepo.add(fileName, t.context.originalBuffer)

  const savedImageBuffer = await fs.readFile(path.join(t.context.dir, 'saved-image.png'))

  t.deepEqual(t.context.originalBuffer, savedImageBuffer)
})

test.serial('#findByName returns buffer if file exists', async t => {
  const buffer = await FileBufferRepo.findByName('saved-image.png')

  t.deepEqual(t.context.originalBuffer, buffer)
})

test.serial('#findByName returns null if file does not exists', async t => {
  const buffer = await FileBufferRepo.findByName('does not exist')

  t.is(null, buffer)
})
