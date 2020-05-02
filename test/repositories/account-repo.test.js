const test = require('ava')
const Account = require('../../src/enitities/account')
const AccountRepo = require('../../src/repositories/account-repo')
const { knex } = require('../../src/db/query-builder')

test.afterEach(async t => {
  await knex.truncate('accounts')
})

test('#add inserts data', async t => {
  const isSuccess = await AccountRepo.add(new Account({
    name: 'Account Name',
    email: 'example@example.com',
    password: 'password'
  }))

  t.true(isSuccess)
})
