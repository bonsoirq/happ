const test = require('ava')
const { toInt } = require('../../src/utils')
const { InvalidArgumentError } = require('../../src/errors')

test('parses string representing a number to int', t => {
  const expected = 123
  const actual = toInt('123')
  t.is(actual, expected)
})

test('parses string representing a number at custom radix to int', t => {
  const expected = 15
  const actual = toInt('f', 16)
  t.is(actual, expected)
})

test('throws error when input cannot be parsed', t => {
  t.throws(() => {
    toInt('foo')
  }, {
    instanceOf: InvalidArgumentError,
    message: 'Value foo at radix 10 cannot be parsed into an interger.'
  })
})
