const { createPool, sql } = require('slonik')
const { Environment } = require('../config')
const connectPool = require('./connect-pool')

const pool = createPool(Environment.dbConnectionString)

connectPool(pool)

module.exports = {
  slonik: pool,
  sql
}
