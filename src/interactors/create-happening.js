const Interactor = require('./interactor')
const Happening = require('../entities/happening')
const AccountRepo = require('../repositories/account-repo')
const HappeningRepo = require('../repositories/happening-repo')
const ValidateHappening = require('./validate-happening')

class CreateHappening extends Interactor {
  constructor ({ name, accountId, description, organizerDescription, agenda },
    { repository = HappeningRepo, accountRepository = AccountRepo, validator }) {
    super()
    this.happening = new Happening({ name, accountId, description, organizerDescription, agenda })
    this._repo = repository
    this._validator = validator || new ValidateHappening({ happening: this.happening }, { accountRepository })
  }

  async call () {
    const result = await this._validator.call()

    if (result.isSuccess) {
      await this._repo.add(this.happening)
    }
    return result
  }
}

module.exports = CreateHappening
