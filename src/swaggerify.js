const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const swaggerDoc = yaml.load('./swagger.yaml')

async function swaggerify (app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
}

module.exports = {
  swaggerify
}
