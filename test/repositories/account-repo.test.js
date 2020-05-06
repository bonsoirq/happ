const test = require('ava')
const Account = require('../../src/entities/account')
const AccountRepo = require('../../src/repositories/account-repo')
const { slonik, sql } = require('../../src/db/connection-pool')

test.after(async t => {
  await slonik.query(sql`
    TRUNCATE TABLE accounts;
  `)
})

test.serial('#add inserts data', async t => {
  const isSuccess = await AccountRepo.add(new Account({
    name: 'Account Name',
    email: 'example@example.com',
    password: 'password'
  }))

  t.true(isSuccess)
})

test.serial('#findByEmail returns entity for valid email', async t => {
  const account = await AccountRepo.findByEmail('example@example.com')

  t.true(account instanceof Account)
  t.is('Account Name', account.name)
  t.is('example@example.com', account.email)
})

test.serial('#findByEmail returns null for invalid email', async t => {
  const account = await AccountRepo.findByEmail('notexisting@example.com')

  t.is(null, account)
})
