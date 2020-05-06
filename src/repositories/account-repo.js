const { slonik, sql } = require('../db/connection-pool')
const Account = require('../entities/account')

class AccountRepo {
  static async add (account) {
    const { id, name, email, password } = account

    const result = await slonik.query(sql`
      INSERT INTO accounts
      (id, name, email, password)
      VALUES
      (${id},${name},${email},${password});
    `)

    return result.rowCount > 0
  }

  static async findByEmail (email) {
    const result = await slonik.query(sql`
      SELECT * FROM accounts
      WHERE email = ${email}
      LIMIT 1;
    `)

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
