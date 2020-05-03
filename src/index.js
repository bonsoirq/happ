const { Environment } = require('./config')
const express = require('express')

const app = express()

attachSwaggerToWebServer()
attachBodyParser()
attachRoutes()
attach404Middleware()

app.listen(Environment.webServerPort, () => {
  messageWebServerIsReady()
})

function attachBodyParser () {
  app.use(require('body-parser').json())
}

function attachSwaggerToWebServer () {
  const { swaggerify } = require('./swaggerify')
  swaggerify(app)
}

function attachRoutes () {
  app.post('/accounts', require('./web-controllers/accounts/create'))
  app.post('/sessions', require('./web-controllers/sessions/create'))
}

function attach404Middleware () {
  const { urlNotFound } = require('./middlewares/url-not-found')
  app.all('*', urlNotFound)
}

function messageWebServerIsReady () {
  console.log(`server listening at ${Environment.webServerPort}`)
}
