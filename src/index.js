const { Environment } = require('./config')
const express = require('express')
const Upload = require('./middlewares/upload')

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
  if (Environment.loggerEnabled) {
    app.use(require('pino-http')())
  }
}

function attachSwaggerToWebServer () {
  const { swaggerify } = require('./swaggerify')
  swaggerify(app)
}

function attachRoutes () {
  const { authenticate } = require('./middlewares/authenticate')

  app.post('/accounts', require('./web-controllers/accounts/create'))
  app.get('/accounts/my', authenticate, require('./web-controllers/accounts/my'))
  app.post('/sessions', require('./web-controllers/sessions/create'))
  app.delete('/sessions', require('./web-controllers/sessions/destroy'))
  app.post('/happenings', authenticate, require('./web-controllers/happenings/create'))
  app.get('/happenings', authenticate, require('./web-controllers/happenings/index'))
  app.put('/happenings/:id', authenticate, require('./web-controllers/happenings/update'))
  app.get('/happenings/:id', require('./web-controllers/happenings/show'))
  app.delete('/happenings/:id', authenticate, require('./web-controllers/happenings/remove'))
  app.get('/happenings/:happeningId/image', authenticate, require('./web-controllers/happening-images/show'))
  app.post('/happenings/:happeningId/image', authenticate, Upload.file(), require('./web-controllers/happening-images/create'))
}

function attach404Middleware () {
  const { urlNotFound } = require('./middlewares/url-not-found')
  app.all('*', urlNotFound)
}

function messageWebServerIsReady () {
  console.log(`INFO: Web server listening at :${Environment.webServerPort}`)
}
