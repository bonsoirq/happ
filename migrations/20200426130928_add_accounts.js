exports.up = (knex) => {
  return knex.schema.createTable('accounts', t => {
    t.uuid('id').primary()
    t.string('name').notNullable()
    t.string('email').notNullable()
    t.string('password').notNullable()
    t.timestamps(false, true)

    t.unique('email')
  }).then(Promise.resolve())
}

exports.down = (knex) => {
  return knex.schema.dropTable('accounts')
}
