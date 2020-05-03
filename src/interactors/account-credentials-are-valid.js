const Interactor = require('./interactor')
const Maybe = require('../utils/maybe')
const AccountRepo = require('../repositories/account-repo')
const bcrypt = require('../utils/bcrypt')

class AccountCredentialsAreValid extends Interactor {
  constructor ({ email, password }, { repository = AccountRepo }) {
    super()
    this.password = password
    this.email = email
    this._repo = repository
  }

  async call () {
    return Maybe
      .of(await this._repo.findByEmail(this.email))
      .map(account => bcrypt.compare(this.password, account.password))
      .or(false)
      .value
  }
}

module.exports = AccountCredentialsAreValid
