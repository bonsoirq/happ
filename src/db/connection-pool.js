const { createPool, sql } = require('slonik')
const { Environment } = require('../config')

const pool = createPool(Environment.dbConnectionString)

pool.connect(async (connection) => {
  await connection.query(sql`SELECT 1`)
})

module.exports = {
  slonik: pool,
  sql
}
