const test = require('ava')
const { noop } = require('../../src/utils/noop')

test('does nothing', t => {
  t.is(undefined, noop())
})
