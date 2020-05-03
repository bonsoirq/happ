const test = require('ava')
const Maybe = require('../../src/utils/maybe')

test('Maybe.of returns maybe instance', t => {
  const value = 0

  t.true(Maybe.of(value) instanceof Maybe)
})

test('.value returns value', async t => {
  const someZero = Maybe.of(0)

  t.is(0, someZero.value)
})

test('.isNone returns true for null', async t => {
  const maybe = Maybe.of(null)

  t.true(maybe.isNone)
})

test('.isNone returns true for undefined', async t => {
  const maybe = Maybe.of()

  t.true(maybe.isNone)
})

test('.isNone returns false for other falsy values', async t => {
  const zero = Maybe.of(0)
  const emptyString = Maybe.of('')
  const emptyArray = Maybe.of([])
  const nan = Maybe.of(NaN)

  t.false(zero.isNone)
  t.false(emptyString.isNone)
  t.false(emptyArray.isNone)
  t.false(nan.isNone)
})

test('#map applies function to stored value if is not nothing', t => {
  const zero = Maybe.of(0)
  const nothing = Maybe.None

  const shouldBeOne = zero.map(x => x + 1).value
  const shouldBeStillNone = nothing.map(x => x.nonExistingMethod())

  t.is(1, shouldBeOne)
  t.true(shouldBeStillNone.isNone)
})

test('#or replaces nothing with given value', t => {
  const nothing = Maybe.None

  const zero = nothing.or(0)

  t.false(zero.isNone)
  t.is(0, zero.value)
})

test('Maybe.None is nothing', t => {
  t.true(Maybe.None.isNone)
})

test('Maybe.None value is always null', t => {
  t.is(null, Maybe.None.value)
  t.is(null, Maybe.of().value)
})
