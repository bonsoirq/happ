const { setupSlonikMigrator } = require('@slonik/migrator')
const path = require('path')
const { slonik } = require('./src/db/connection-pool')

const migrator = setupSlonikMigrator({
  migrationsPath: path.join(__dirname, '/migrations'),
  slonik,
  mainModule: module
})

module.exports = { slonik, migrator }
