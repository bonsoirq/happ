const { slonik, sql } = require('../db/connection-pool')
const Happening = require('../entities/happening')

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

  static async findByAccountId (accountId) {
    const result = await slonik.query(sql`
      SELECT * FROM happenings
      WHERE account_id =${accountId}
    `)

    const happenings = result.rows.map(row => {
      const {
        id,
        name,
        account_id: accountId,
        description,
        organizer_description: organizerDescription,
        agenda
      } = row

      return new Happening({ id, name, accountId, description, organizerDescription, agenda })
    })

    return happenings
  }
}

module.exports = HappeningRepo
