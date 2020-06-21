const { sql } = require('slonik')

const connectPool = async (pool) => {
  await pool.connect(async (connection) => {
    await connection.query(sql`SELECT 1`)
  }).catch(() => {
    console.error('ERROR: Unable to connect to database. Make sure the database server is running.')
  })
}

module.exports = connectPool
