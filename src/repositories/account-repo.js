const { knex } = require('../db/query-builder')

class AccountRepo {
  static async add (account) {
    const sql = knex.insert({
      id: account.id,
      name: account.name,
      email: account.email,
      password: account.password
    }).into('accounts').toQuery()

    const result = await knex.raw(sql)

    return result.rowCount > 0
  }
}

module.exports = AccountRepo
