const GrantAccountAuthToken = require('../../interactors/grant-account-auth-token')

async function create (req, res, next) {
  const result = await GrantAccountAuthToken.call({
    email: req.body.email,
    password: req.body.password
  })

  if (result.isSuccess) {
    const token = result.value()
    res.status(200).json({
      authToken: token
    })
  } else {
    res.status(400).send()
  }
}

module.exports = create
