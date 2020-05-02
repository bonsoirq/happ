const CreateAccount = require('../../interactors/create-account')

async function create (req, res, next) {
  await CreateAccount.call({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  res.status(201).send()
}

module.exports = create
