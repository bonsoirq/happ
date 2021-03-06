const test = require('ava')
const Account = require('../../src/entities/account')
const MockAccount = require('../mocks/account')
const AccountRepo = require('../../src/repositories/account-repo')
const { slonik, sql } = require('../../src/db/connection-pool')
const Helper = require('../helper')

test.after(async t => {
  await slonik.query(sql`
    TRUNCATE TABLE accounts;
  `)
})

test.serial('#add inserts data', async t => {
  const isSuccess = await AccountRepo.add(MockAccount({ id: '37ca5d2b-38ee-4cdc-9d66-d9bd4d9feb07' }))

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

test.serial('#findById returns entity for valid id', async t => {
  const account = await AccountRepo.findById('37ca5d2b-38ee-4cdc-9d66-d9bd4d9feb07')

  t.true(account instanceof Account)
  t.is('Account Name', account.name)
  t.is('example@example.com', account.email)
})

test.serial('#findById returns null for invalid id', async t => {
  const account = await AccountRepo.findById(Helper.nilUUID)

  t.is(null, account)
})
