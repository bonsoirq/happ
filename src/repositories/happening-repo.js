const { slonik, sql } = require('../db/connection-pool')

class HappeningRepo {
  static async add (happening) {
    const { id, name, email, password } = happening

    const result = await slonik.query(sql`
      INSERT INTO happenings
      (id, name, email, password)
      VALUES
      (${id},${name},${email},${password});
    `)

    return result.rowCount > 0
  }
}

module.exports = HappeningRepo
