const jwt = require('jsonwebtoken')
const { Auth } = require('../config')

function authenticateAccount (req, res, next) {
  const token = req.cookies[Auth.cookieName]
  try {
    const result = jwt.verify(token, Auth.jwtSecret)
    const accountId = result.sub
    next(accountId)
  } catch (error) {
    res.status(401).send()
  }
}

module.exports = { authenticateAccount }
