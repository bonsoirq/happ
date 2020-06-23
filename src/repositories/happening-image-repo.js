const { slonik, sql } = require('../db/connection-pool')

class HappeningImageRepo {
  static async add (happeningImage) {
    const { id, happeningId, path } = happeningImage

    const result = await slonik.query(sql`
      INSERT INTO happening_images
      (id, happening_id, path)
      VALUES
      (${id},${happeningId},${path});
    `)

    return result.rowCount > 0
  }
}

module.exports = HappeningImageRepo
