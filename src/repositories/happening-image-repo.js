const { slonik, sql } = require('../db/connection-pool')
const HappeningImage = require('../entities/happening-image')

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

  static async findByHappeningId (happeningId) {
    const result = await slonik.query(sql`
    SELECT * FROM happening_images
    WHERE happening_id = ${happeningId}
    LIMIT 1;
    `)

    if (result.rowCount === 0) {
      return null
    } else {
      const [row] = result.rows
      const {
        id,
        happening_id: happeningId,
        path
      } = row

      return new HappeningImage({ id, happeningId, path })
    }
  }

  static async removeByHappeningId (happeningId) {
    const result = await slonik.query(sql`
    DELETE FROM happening_images
    WHERE happening_id = ${happeningId}
    `)

    return result.rowCount > 0
  }
}

module.exports = HappeningImageRepo
