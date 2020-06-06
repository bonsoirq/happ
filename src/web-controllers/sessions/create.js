const GrantAccountAuthToken = require('../../interactors/grant-account-auth-token')
const { Auth } = require('../../config')

async function create (req, res, next) {
  const { email, password } = req.body

  if (email == null || password == null) {
    return res.status(400).send()
  }

  const result = await GrantAccountAuthToken.call({
    email: req.body.email,
    password: req.body.password
  })

  if (result.isSuccess) {
    const token = result.value()
    putAuthCookie(res, token)
    res.status(200).json({
      authToken: token
    })
  } else {
    res.status(400).send()
  }
}

function putAuthCookie (res, token) {
  const MS_PER_DAY = 24 * 60 * 60 * 1000
  res.cookie(Auth.cookieName, token, {
    expires: new Date(Date.now() + MS_PER_DAY),
    httpOnly: true
  })
}

module.exports = create
