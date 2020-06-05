const { Auth } = require('../../config')

async function destroy (req, res, next) {
  res.clearCookie(Auth.cookieName)
  res.status(200).send()
}

module.exports = destroy
