const test = require('ava')
const { Maybe, None, Some } = require('../../src/utils/maybe')

test('Some throws error when passed null', t => {
  t.throws(() => {
    Some(null)
  }, {
    instanceOf: Error,
    message: 'Cannot wrap nullish value in Some()'
  })
})

test('Some throws error when passed undefined', t => {
  t.throws(() => {
    Some(undefined)
  }, {
    instanceOf: Error,
    message: 'Cannot wrap nullish value in Some()'
  })
})

test('Some returns Some() when passed non nullish value', t => {
  t.notThrows(() => Some(0))
})

test('#valueOr returns value', t => {
  const someZero = Maybe(0)
  const none = None()

  t.is(0, someZero.valueOr(1))
  t.is(1, none.valueOr(1))
})

test('#value throws error for None()', t => {
  t.throws(() => {
    None().value()
  }, {
    instanceOf: Error,
    message: 'Cannot unwrap value of None()'
  })
})

test('#value returns value of Some()', t => {
  t.is(0, Some(0).value())
})

test('.isNone is true for None(), Maybe(nullish value)', t => {
  const expliciteNone = None()
  const noneFromNull = Maybe(null)
  const noneFromUndefined = Maybe(undefined)

  t.true(expliciteNone.isNone)
  t.true(noneFromNull.isNone)
  t.true(noneFromUndefined.isNone)

  t.false(expliciteNone.isSome)
  t.false(noneFromNull.isSome)
  t.false(noneFromUndefined.isSome)
})

test('.isNone is false for other falsy values', t => {
  const zero = Maybe(0)
  const emptyString = Maybe('')
  const emptyArray = Maybe([])
  const nan = Maybe(NaN)

  t.false(zero.isNone)
  t.true(zero.isSome)
  t.false(emptyString.isNone)
  t.true(emptyString.isSome)
  t.false(emptyArray.isNone)
  t.true(emptyArray.isSome)
  t.false(nan.isNone)
  t.true(nan.isSome)
})

test('#map applies function to stored value if is not None()', t => {
  const some = Some(0)
  const none = None()

  t.throws(() => {
    some.map(x => {
      throw new Error()
    })
  })

  t.notThrows(() => {
    none.map(x => {
      throw new Error()
    })
  })
})

test('#map wraps returned value back into Maybe()', t => {
  const wrappedOne = Some(0).map(x => x + 1)

  t.not('number', typeof wrappedOne)
})

test('#bind applies function to stored value if is not None()', t => {
  const some = Some(0)
  const none = None()

  t.throws(() => {
    some.bind(x => {
      throw new Error()
    })
  })

  t.notThrows(() => {
    none.bind(x => {
      throw new Error()
    })
  })
})

test('#bind returns returned value', t => {
  const unwrappedOne = Some(0).bind(x => x + 1)

  t.is(1, unwrappedOne)
})
