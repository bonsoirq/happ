const test = require('ava')
const { extend } = require('../../src/utils/extend')

test('returns new object', async t => {
  const expected = { foo: 'bar' }
  const actual = extend(expected, {})

  t.deepEqual(expected, actual)
  t.not(expected, actual)
})

test('adds new properties', async t => {
  const expected = { foo: 'bar', bar: 'baz' }
  const actual = extend({ foo: 'bar' }, { bar: 'baz' })

  t.deepEqual(expected, actual)
})

test('overrides conflicting properties', async t => {
  const expected = { foo: 'bar', bar: 'quux' }
  const actual = extend({ foo: 'bar', bar: 'baz' }, { bar: 'quux' })

  t.deepEqual(expected, actual)
})
