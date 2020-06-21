const { Environment } = require('./config')
const express = require('express')

const app = express()

attachSwaggerToWebServer()
attachMiddlewares()
attachRoutes()
attach404Middleware()

app.listen(Environment.webServerPort, () => {
  messageWebServerIsReady()
})

function attachMiddlewares () {
  app.use(require('cors')({
    origin: true,
    credentials: true
  }))
  app.use(require('body-parser').json())
  app.use(require('cookie-parser')())
  app.use(require('pino-http')())
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
  app.delete('/happenings/:id', authenticateAccount, require('./web-controllers/happenings/remove'))
}

function attach404Middleware () {
  const { urlNotFound } = require('./middlewares/url-not-found')
  app.all('*', urlNotFound)
}

function messageWebServerIsReady () {
  console.log(`INFO: Web server listening at :${Environment.webServerPort}`)
}
