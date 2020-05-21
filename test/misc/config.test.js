const { Auth, Environment } = require('../../src/config')
const test = require('ava')

test('Environment#isDevelopment returns true for development NODE_ENV', t => {
  process.env.NODE_ENV = 'development'

  t.true(Environment.isDevelopment)
})

test('Environment#webServerPort returns 3000 by default', t => {
  process.env.NODE_ENV = 'development'
  const expected = 3000

  t.is(expected, Environment.webServerPort)
})

test('Auth#cookieName returns expected cookie name', t => {
  const expected = '_happ_auth'

  t.is(expected, Auth.cookieName)
})
