const test = require('ava')
const sinon = require('sinon')
const connectPool = require('../../src/db/connect-pool')
const { createPool } = require('slonik')
const { noop } = require('../../src/utils/noop')

test.before(t => {
  t.context.consoleStub = sinon.stub(console, 'error').callsFake(noop)
})

test.after(t => {
  t.context.consoleStub.restore()
})

test('not throws on invalid connection string', async t => {
  await t.notThrowsAsync(async () => await connectPool(createPool('invalid connection')))
  const consoleCalled = t.context.consoleStub.called
  t.true(consoleCalled)
})
