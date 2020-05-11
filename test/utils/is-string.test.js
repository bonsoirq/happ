const test = require('ava')
const { isString } = require('../../src/utils/is-string')

test('returns true for primitive', t => {
  t.true(isString(''))
  t.true(isString('Should be true'))
})

test('returns true for String instance', t => {
  // eslint-disable-next-line no-new-wrappers
  t.true(isString(new String()))
})

test('returns false for other values', t => {
  t.false(isString(undefined))
  t.false(isString(null))
  t.false(isString(0))
  t.false(isString(Symbol('not string')))
  t.false(isString([]))
  t.false(isString({}))
})
