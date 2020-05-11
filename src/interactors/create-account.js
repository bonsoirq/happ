const Interactor = require('./interactor')
const Account = require('../entities/account')
const AccountRepo = require('../repositories/account-repo')
const bcrypt = require('../utils/bcrypt')

class CreateAccount extends Interactor {
  constructor ({ name, email, password }, { repository = AccountRepo }) {
    super()
    this.plainPassword = password
    this.account = new Account({ name, email })
    this._repo = repository
  }

  async call () {
    if (await this.emailAddressIsUnique()) {
      await this.hashPassword()
      await this._repo.add(this.account)
    }
  }

  async hashPassword () {
    this.account.password = await bcrypt.hash(this.plainPassword)
  }

  async emailAddressIsUnique () {
    return await this._repo.findByEmail(this.account.email) == null
  }
}

module.exports = CreateAccount
