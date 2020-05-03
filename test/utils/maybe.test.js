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
  t.false(maybe.isSome)
})

test('.isNone returns true for undefined', async t => {
  const maybe = Maybe.of()

  t.true(maybe.isNone)
  t.false(maybe.isSome)
})

test('.isNone returns false for other falsy values', async t => {
  const zero = Maybe.of(0)
  const emptyString = Maybe.of('')
  const emptyArray = Maybe.of([])
  const nan = Maybe.of(NaN)

  t.false(zero.isNone)
  t.true(zero.isSome)
  t.false(emptyString.isNone)
  t.true(emptyString.isSome)
  t.false(emptyArray.isNone)
  t.true(emptyArray.isSome)
  t.false(nan.isNone)
  t.true(nan.isSome)
})

test('#map applies function to stored value if is not none', t => {
  const zero = Maybe.of(0)
  const none = Maybe.None

  const shouldBeOne = zero.map(x => x + 1).value
  const shouldBeStillNone = none.map(x => x.nonExistingMethod())

  t.is(1, shouldBeOne)
  t.true(shouldBeStillNone.isNone)
})

test('#or replaces none with given value', t => {
  const none = Maybe.None

  const zero = none.or(0)

  t.false(zero.isNone)
  t.is(0, zero.value)
})

test('Maybe.None is none', t => {
  t.true(Maybe.None.isNone)
})

test('Maybe.None value is always null', t => {
  t.is(null, Maybe.None.value)
  t.is(null, Maybe.of().value)
})

test('#ifSome invokes function when maybe is not none', t => {
  let shouldBecomeTrue = 0

  Maybe
    .of(shouldBecomeTrue)
    .ifSome((currentValue) => { shouldBecomeTrue = currentValue === 0 })

  t.true(shouldBecomeTrue)
})

test('#ifSome does nothing when maybe is none', t => {
  let shouldStayFalse = false

  Maybe
    .None
    .ifSome(() => { shouldStayFalse = true })

  t.false(shouldStayFalse)
})

test('#ifNone invokes function when maybe is none', t => {
  let shouldBecomeTrue = 0

  Maybe
    .None
    .ifNone(() => { shouldBecomeTrue = true })

  t.true(shouldBecomeTrue)
})

test('#ifNone does nothing when maybe is not none', t => {
  let shouldStayFalse = false

  Maybe
    .of(0)
    .ifNone(() => { shouldStayFalse = true })

  t.false(shouldStayFalse)
})
