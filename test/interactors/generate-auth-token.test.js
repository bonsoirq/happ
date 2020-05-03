const test = require('ava')
const GenerateAuthToken = require('../../src/interactors/generate-auth-token')

test('generates JWT for given resource id', async t => {
  const resourceId = 'some-id'

  const jwt = await GenerateAuthToken.call({
    resourceId,
    expiresAt: new Date(2000, 1, 1)
  })

  t.is(3, jwt.split('.').length)

  const [, payload] = jwt.split('.')

  const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString('ascii'))

  t.is('some-id', decodedPayload.sub)
  t.is(949359600, decodedPayload.exp)
})
