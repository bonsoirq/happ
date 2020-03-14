const { Environment } = require('./config')
const express = require('express')

const app = express()
app.listen(Environment.webServerPort(), () => {
  attachSwaggerToWebServer()
  attach404Middleware()
  messageWebServerIsReady()
})

function attach404Middleware () {
  const { urlNotFound } = require('./middlewares/url-not-found')
  app.all('*', urlNotFound)
}

function attachSwaggerToWebServer () {
  const { swaggerify } = require('./swaggerify')
  swaggerify(app)
}

function messageWebServerIsReady () {
  console.log(`server listening at ${Environment.webServerPort()}`)
}
