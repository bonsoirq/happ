const { Environment } = require('../config')

const knex = require('knex')({
  client: 'pg',
  connection: Environment.dbConnectionString
})

module.exports = { knex }
