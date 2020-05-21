const { slonik, sql } = require('../db/connection-pool')

class HappeningRepo {
  static async add (happening) {
    const { id, name, accountId, description, organizerDescription, agenda } = happening

    const result = await slonik.query(sql`
      INSERT INTO happenings
      (id, name, account_id, description, organizer_description, agenda)
      VALUES
      (${id},${name},${accountId},${description},${organizerDescription}, ${agenda});
    `)

    return result.rowCount > 0
  }
}

module.exports = HappeningRepo
