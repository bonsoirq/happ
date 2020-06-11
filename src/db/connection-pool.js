const { createPool, sql } = require('slonik')
const { Environment } = require('../config')

const pool = createPool(Environment.dbConnectionString)

pool.connect(async (connection) => {
  await connection.query(sql`SELECT 1`)
}).catch(() => {
  console.error('ERROR: Unable to connect to database. Make sure the database server is running.')
})

module.exports = {
  slonik: pool,
  sql
}
