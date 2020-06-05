const { Environment } = require('./config')
const express = require('express')

const app = express()

attachSwaggerToWebServer()
attachParsers()
attachRoutes()
attach404Middleware()

app.listen(Environment.webServerPort, () => {
  messageWebServerIsReady()
})

function attachParsers () {
  app.use(require('body-parser').json())
  app.use(require('cookie-parser')())
}

function attachSwaggerToWebServer () {
  const { swaggerify } = require('./swaggerify')
  swaggerify(app)
}

function attachRoutes () {
  const { authenticateAccount } = require('./middlewares/auth-account')

  app.post('/accounts', require('./web-controllers/accounts/create'))
  app.get('/accounts/my', authenticateAccount, require('./web-controllers/accounts/my'))
  app.post('/sessions', require('./web-controllers/sessions/create'))
  app.delete('/sessions', require('./web-controllers/sessions/destroy'))
  app.post('/happenings', authenticateAccount, require('./web-controllers/happenings/create'))
  app.get('/happenings', authenticateAccount, require('./web-controllers/happenings/index'))
}

function attach404Middleware () {
  const { urlNotFound } = require('./middlewares/url-not-found')
  app.all('*', urlNotFound)
}

function messageWebServerIsReady () {
  console.log(`server listening at ${Environment.webServerPort}`)
}
