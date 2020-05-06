const bcrypt = require('../src/utils/bcrypt')
const AccountRepo = require('../src/repositories/account-repo')
const Account = require('../src/entities/account')

async function seed () {
  await AccountRepo.add(new Account({
    id: '65a89eba-bce7-4168-8cdf-34ef7cb2bc7a',
    name: 'John Appleseed',
    email: 'user@example.com',
    password: await bcrypt.hash('password')
  }))
}

module.exports = seed()
