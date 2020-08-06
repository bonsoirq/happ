const { slonik, sql } = require('../db/connection-pool')
const Happening = require('../entities/happening')

class HappeningRepo {
  static async add (happening) {
    const { id, name, accountId, description, organizerDescription, agenda, isPublished } = happening

    const result = await slonik.query(sql`
      INSERT INTO happenings
      (id, name, account_id, description, organizer_description, agenda, is_published)
      VALUES
      (${id},${name},${accountId},${description},${organizerDescription},${agenda},${isPublished});
    `)

    return result.rowCount > 0
  }

  static async remove (id) {
    const result = await slonik.query(sql`
      DELETE FROM happenings
      WHERE
      id=(${id});
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
        agenda,
        is_published: isPublished
      } = row

      return new Happening({ id, name, accountId, description, organizerDescription, agenda, isPublished })
    })

    return happenings
  }

  static async findById (id) {
    const result = await slonik.query(sql`
      SELECT * FROM happenings
      WHERE id = ${id}
      LIMIT 1;
    `)

    if (result.rowCount === 0) {
      return null
    } else {
      const [row] = result.rows
      const {
        id,
        name,
        account_id: accountId,
        description,
        organizer_description: organizerDescription,
        agenda,
        is_published: isPublished
      } = row

      return new Happening({ id, name, accountId, description, organizerDescription, agenda, isPublished })
    }
  }
}

module.exports = HappeningRepo
