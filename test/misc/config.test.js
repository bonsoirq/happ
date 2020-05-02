const { Environment } = require('../../src/config')
const test = require('ava')

test('Environment#isDevelopment returns true for development NODE_ENV', t => {
  process.env.NODE_ENV = 'development'

  t.true(Environment.isDevelopment)
})

test('Environment#webServerPort returns 3000 by default', t => {
  process.env.NODE_ENV = 'development'

  t.is(Environment.webServerPort, 3000)
})
