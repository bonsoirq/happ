const CreateAccount = require('../../interactors/create-account')

async function create (req, res, next) {
  await AccountCredentialsAreValid.call({
    email: req.body.email,
    password: req.body.password
  })

  res.status(200).send()
}

module.exports = create
