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

test('.isNothing returns true for null', async t => {
  const maybe = Maybe.of(null)

  t.true(maybe.isNothing)
})

test('.isNothing returns true for undefined', async t => {
  const maybe = Maybe.of()

  t.true(maybe.isNothing)
})

test('.isNothing returns false for other falsy values', async t => {
  const zero = Maybe.of(0)
  const emptyString = Maybe.of('')
  const emptyArray = Maybe.of([])
  const nan = Maybe.of(NaN)

  t.false(zero.isNothing)
  t.false(emptyString.isNothing)
  t.false(emptyArray.isNothing)
  t.false(nan.isNothing)
})

test('#map applies function to stored value if is not nothing', t => {
  const zero = Maybe.of(0)
  const nothing = Maybe.Nothing

  const shouldBeOne = zero.map(x => x + 1).value
  const shouldBeStillNothing = nothing.map(x => x.nonExistingMethod())

  t.is(1, shouldBeOne)
  t.true(shouldBeStillNothing.isNothing)
})

test('#or replaces nothing with given value', t => {
  const nothing = Maybe.Nothing

  const zero = nothing.or(0)

  t.false(zero.isNothing)
  t.is(0, zero.value)
})

test('Maybe.Nothing is nothing', t => {
  t.true(Maybe.Nothing.isNothing)
})

test('Maybe.Nothing value is always null', t => {
  t.is(null, Maybe.Nothing.value)
  t.is(null, Maybe.of().value)
})
