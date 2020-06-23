const test = require('ava')
const CreateHappening = require('../../src/interactors/create-happening')
const AccountMock = require('../mocks/account')
const InMemoryRepo = require('../../src/repositories/in-memory-repo')
const Helper = require('../helper')

test('creates happening when it is valid', async t => {
  const repository = new InMemoryRepo()

  await new CreateHappening({
    name: 'Fantastic Event',
    accountId: Helper.nilUUID,
    description: 'The best event you are going to experience',
    organizerDescription: 'By John Appleseed',
    agenda: '10AM to 1PM @ the library'
  }, {
    repository,
    accountRepository: { findById: async () => AccountMock() }
  }).call()

  t.is(1, await repository.count())
})
