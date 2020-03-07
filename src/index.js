const { Environment } = require('./config')
const express = require('express')

const app = express()
app.listen(Environment.webServerPort(), () => {
  console.log(`server listening at ${Environment.webServerPort()}`)
})
