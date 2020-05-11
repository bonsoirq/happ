const test = require('ava')
const { isEmpty, notEmpty } = require('../../src/utils/is-empty')

test('returns true for empty string', t => {
  t.true(isEmpty(''))
  t.false(notEmpty(''))
})

test('returns false for not empty string', t => {
  t.false(isEmpty('some text'))
  t.true(notEmpty('some text'))
})

test('throws TypeError for not iterables', t => {
  t.throws(() => {
    isEmpty({})
  }, {
    instanceOf: TypeError
  })

  t.throws(() => {
    isEmpty(0)
  }, {
    instanceOf: TypeError
  })
})

test('returns true for empty array', t => {
  t.true(isEmpty([]))
  t.false(notEmpty([]))
})

test('returns false for not empty array', t => {
  t.false(isEmpty([0]))
  t.true(notEmpty([0]))
})

test('returns true for empty set', t => {
  t.true(isEmpty(new Set()))
  t.false(notEmpty(new Set()))
})

test('returns false for not empty set', t => {
  t.false(isEmpty(new Set([0])))
  t.true(notEmpty(new Set([0])))
})

test('returns true for empty map', t => {
  t.true(isEmpty(new Map()))
  t.false(notEmpty(new Map()))
})

test('returns false for not empty map', t => {
  t.false(isEmpty(new Map([['key', 'value']])))
  t.true(notEmpty(new Map([['key', 'value']])))
})
