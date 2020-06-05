const Interactor = require('./interactor')
const AccountRepo = require('../repositories/account-repo')
const { Success, Failure } = require('../utils/result')

class CreateAccount extends Interactor {
  constructor ({ accountId }, { repository = AccountRepo } = {}) {
    super()
    this.accountId = accountId
    this._repo = repository
  }

  async call () {
    const account = await this._repo.findById(this.accountId)
    if (account != null) {
      const { id, name, email } = account
      return Success({ id, name, email })
    } else {
      return Failure()
    }
  }
}

module.exports = CreateAccount
