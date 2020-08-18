const test = require('ava')
const { isUUID } = require('../../src/utils/is-uuid')

test('returns true for valid uuid', t => {
  t.true(isUUID('231c0520-99d4-4cbd-97ec-85a36d5d8f95'))
})

test('returns false for other values', t => {
  t.false(isUUID('1'))
  t.false(isUUID('-99d4-4cbd-97ec-85a36d5d8f95'))
  t.false(isUUID(23))
  t.false(isUUID('test'))
  t.false(isUUID(null))
})
