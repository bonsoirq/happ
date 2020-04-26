const test = require('ava')
const Interactor = require('../../src/interactors/interactor')

test('call() throws error when derived class does not implement it', async t => {
  class Shouldthrow extends Interactor {}

  await t.throwsAsync(async () => {
    await Shouldthrow.call()
  }, {
    instanceOf: Error,
    message: 'Has to be implemented in derived class!'
  })
})

test('call() returns value when implemented', async t => {
  class ShouldReturnTrue extends Interactor {
    async call () {
      return true
    }
  }

  t.true(await ShouldReturnTrue.call())
})
