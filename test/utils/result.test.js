const test = require('ava')
const { Success, Failure } = require('../../src/utils/result')

test('.isSuccess returns valid value according to called factory', t => {
  t.true(Success().isSuccess)
  t.false(Failure().isSuccess)
})

test('.isFailure returns valid value according to called factory', t => {
  t.false(Success().isFailure)
  t.true(Failure().isFailure)
})

test('#valueOr returns value of Result()', async t => {
  const failure = Failure('something went wrong')
  const success = Success(0)

  t.is(0, success.valueOr(1))
  t.is(1, failure.valueOr(1))
})

test('#map applies function to stored value if it is Success()', t => {
  const success = Success(0)
  const failure = Failure(0)

  t.throws(() => {
    success.map(x => {
      throw new Error()
    })
  })

  t.notThrows(() => {
    failure.map(x => {
      throw new Error()
    })
  })
})

test('#bind applies function to stored value if it is Success()', t => {
  const success = Success(0)
  const failure = Failure(0)

  t.throws(() => {
    success.bind(x => {
      throw new Error()
    })
  })

  t.notThrows(() => {
    failure.bind(x => {
      throw new Error()
    })
  })
})

test('#bind returns unwrapped value', t => {
  const one = Success(0).bind(x => x + 1)

  t.is(1, one)
})

test('#value returns value of Success()', t => {
  t.is(0, Success(0).value())
})

test('#reason returns reason of Failure()', t => {
  t.is('error', Failure('error').reason())
})
