const jwt = require('jsonwebtoken')
const { Auth } = require('../config')

function authenticate (req, res, next) {
  const token = req.cookies[Auth.cookieName]
  try {
    const result = jwt.verify(token, Auth.jwtSecret)
    res.locals.accountId = result.sub
    next()
  } catch (error) {
    res.status(401).send()
  }
}

module.exports = { authenticate }
