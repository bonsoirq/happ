const bcrypt = require('../src/utils/bcrypt')

exports.seed = (knex) => {
  return knex('accounts').del()
    .then(async () => {
      return knex('accounts').insert([
        {
          id: '65a89eba-bce7-4168-8cdf-34ef7cb2bc7a',
          name: 'John Appleseed',
          email: 'user@example.com',
          password: await bcrypt.hash('password')
        }
      ])
    })
}
