const test = require('ava')
const { bcrypt } = require('../../src/utils')

test('encrypted text is different from plain text', async t => {
  const input = 'some plain text'
  const output = await bcrypt.hash(input)

  t.not(input, output)
})

test('validates encrypted value with plain one', async t => {
  const input = 'some plain text'
  const output = await bcrypt.hash(input)

  const shouldBeTrue = await bcrypt.compare(input, output)
  t.true(shouldBeTrue)
})
