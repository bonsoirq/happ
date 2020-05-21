const test = require('ava')
const ValidateHappening = require('../../src/interactors/validate-happening')
const Account = require('../../src/entities/account')
const Happening = require('../../src/entities/happening')
const { EMPTY, NOT_FOUND, NOT_STRING } = require('../../src/enums/validation-error')
const Helper = require('../helper')

test('succeeds for valid Happening', async t => {
  const result = await new ValidateHappening({
    happening: new Happening({
      name: 'Fantastic Event',
      accountId: Helper.nilUUID,
      description: 'The best event you are going to experience',
      organizerDescription: 'By John Appleseed',
      agenda: '10AM to 1PM @ the library'
    })
  },
  {
    accountRepository: {
      findById: async () => new Account({})
    }
  }).call()

  t.true(result.isSuccess)
})

test('fails for missing Account', async t => {
  const result = await new ValidateHappening({
    happening: new Happening({
      name: 'Fantastic Event',
      accountId: Helper.nilUUID,
      description: 'The best event you are going to experience',
      organizerDescription: 'By John Appleseed',
      agenda: '10AM to 1PM @ the library'
    })
  },
  {
    accountRepository: {
      findById: async () => null
    }
  }).call()

  t.true(result.isFailure)
  t.deepEqual({
    accountId: [NOT_FOUND]
  }, result.reason())
})

test('fails for empty name', async t => {
  const result = await new ValidateHappening({
    happening: new Happening({
      name: '',
      accountId: Helper.nilUUID,
      description: 'The best event you are going to experience',
      organizerDescription: 'By John Appleseed',
      agenda: '10AM to 1PM @ the library'
    })
  },
  {
    accountRepository: {
      findById: async () => new Account({})
    }
  }).call()

  t.log(result)
  t.true(result.isFailure)
  t.deepEqual({
    name: [EMPTY]
  }, result.reason())
})

test('fails for invalid name', async t => {
  const result = await new ValidateHappening({
    happening: new Happening({
      name: true,
      accountId: Helper.nilUUID,
      description: 'The best event you are going to experience',
      organizerDescription: 'By John Appleseed',
      agenda: '10AM to 1PM @ the library'
    })
  },
  {
    accountRepository: {
      findById: async () => new Account({})
    }
  }).call()

  t.true(result.isFailure)
  t.deepEqual({
    name: [NOT_STRING]
  }, result.reason())
})
