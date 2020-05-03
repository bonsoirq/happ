const test = require('ava')
const Account = require('../../src/entities/account')
const bcrypt = require('../../src/utils/bcrypt')
const AccountCredentialsAreValid = require('../../src/interactors/account-credentials-are-valid')
const InMemoryRepo = require('../../src/repositories/in-memory-repo')

class InMemoryAccountRepo extends InMemoryRepo {
  async findByEmail (email) {
    return Array.from(this.map.values()).find(x => x.email === email)
  }
}

test('returns true when credentials match', async t => {
  const repository = new InMemoryAccountRepo()

  const account = new Account({
    name: 'Foo',
    email: 'foo@example.com',
    password: await bcrypt.hash('plainText')
  })

  repository.add(account)

  const shoulBeTrue = await AccountCredentialsAreValid.call({
    email: 'foo@example.com',
    password: 'plainText'
  }, { repository })

  t.true(shoulBeTrue)
})
