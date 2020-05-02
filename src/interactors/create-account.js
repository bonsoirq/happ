const Interactor = require('./interactor')
const Acccount = require('../enitities/account')
const AccountRepo = require('../repositories/account-repo')
const bcrypt = require('../utils/bcrypt')

class CreateAccount extends Interactor {
  constructor ({ name, email, password }, { repository = AccountRepo } = {}) {
    super()
    this.plainPassword = password
    this.account = new Acccount({ name, email })
    this.repo = repository
  }

  async call () {
    this.account.password = await bcrypt.hash(this.plainPassword)
    await this.repo.add(this.account)
  }
}

module.exports = CreateAccount
