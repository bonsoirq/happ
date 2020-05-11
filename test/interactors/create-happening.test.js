const test = require('ava')
const CreateHappening = require('../../src/interactors/create-happening')
const Account = require('../../src/entities/account')
const InMemoryRepo = require('../../src/repositories/in-memory-repo')
const Helper = require('../helper')

test('creates happening when it is valid', async t => {
  const repository = new InMemoryRepo()

  await new CreateHappening({
    name: 'Fantastic Event',
    accountId: Helper.emptyUUID,
    description: 'The best event you are going to experience',
    organizerDescription: 'By John Appleseed',
    agenda: '10AM to 1PM @ the library'
  }, {
    repository,
    accountRepository: { findById: async () => new Account({}) }
  }).call()

  t.is(1, await repository.count())
})
