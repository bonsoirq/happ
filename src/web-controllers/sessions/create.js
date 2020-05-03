const GrantAccountAuthToken = require('../../interactors/grant-account-auth-token')
const Maybe = require('../../utils/maybe')

async function create (req, res, next) {
  Maybe
    .of(await GrantAccountAuthToken.call({
      email: req.body.email,
      password: req.body.password
    }))
    .ifSome((token) => {
      res.status(200).json({
        authToken: token
      })
    })
    .ifNone(() => {
      res.status(400).send()
    })
}

module.exports = create
