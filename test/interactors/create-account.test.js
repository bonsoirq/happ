const test = require('ava')
const CreateAccount = require('../../src/interactors/create-account')
const InMemoryRepo = require('../../src/repositories/in-memory-repo')

test('creates account with encrypted password', async t => {
  const repository = new InMemoryRepo()

  await new CreateAccount({
    name: 'Foo',
    email: 'foo@example.com',
    password: 'plainText'
  }, { repository }).call()

  t.true(await repository.count() === 1)
})
