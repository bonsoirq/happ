const test = require('ava')
const Account = require('../../src/entities/account')
const CreateAccount = require('../../src/interactors/create-account')
const InMemoryRepo = require('../../src/repositories/in-memory-repo')

class InMemoryAccountRepo extends InMemoryRepo {
  async findByEmail (email) {
    return Array.from(this.map.values()).find(x => x.email === email)
  }
}

test('creates account with encrypted password', async t => {
  const repository = new InMemoryAccountRepo()

  await new CreateAccount({
    name: 'Foo',
    email: 'foo@example.com',
    password: 'plainText'
  }, { repository }).call()

  t.is(await repository.count(), 1)
})

test('does nothing when emails is not unique', async t => {
  const repository = new InMemoryAccountRepo()

  await repository.add(new Account({
    name: 'Foo',
    email: 'foo@example.com',
    password: 'plainText'
  }))

  await new CreateAccount({
    name: 'Bar',
    email: 'foo@example.com',
    password: 'plainText'
  }, { repository }).call()

  t.is(await repository.count(), 1)
})
