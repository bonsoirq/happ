const swaggerUi = require('swagger-ui-express')
const path = require('path')
const fs = require('fs')
const yaml = require('yaml')

async function swaggerify (app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc()))
}

function swaggerDoc () {
  const filepath = path.join(__dirname, '../swagger.yaml')
  const file = fs.readFileSync(filepath, { encoding: 'utf8' })
  return yaml.parseDocument(file)
}

module.exports = {
  swaggerify
}
