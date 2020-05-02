const { knex } = require('../db/query-builder')
const Account = require('../entities/account')

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

  static async findByEmail (email) {
    const sql = knex.select().from('accounts').where({ email }).limit(1).toQuery()

    const result = await knex.raw(sql)

    if (result.rowCount === 0) {
      return null
    } else {
      const [row] = result.rows
      const { id, email, name, password } = row
      return new Account({ id, email, name, password })
    }
  }
}

module.exports = AccountRepo
