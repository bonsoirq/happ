const Interactor = require('./interactor')
const Acccount = require('../entities/account')
const AccountRepo = require('../repositories/account-repo')
const bcrypt = require('../utils/bcrypt')

class CreateAccount extends Interactor {
  constructor ({ name, email, password }, { repository = AccountRepo }) {
    super()
    this.plainPassword = password
    this.account = new Acccount({ name, email })
    this.repo = repository
  }

  async call () {
    if (await this.emailAddressIsUnique()) {
      await this.hashPassword()
      await this.repo.add(this.account)
    }
  }

  async hashPassword () {
    this.account.password = await bcrypt.hash(this.plainPassword)
  }

  async emailAddressIsUnique () {
    return await this.repo.findByEmail(this.account.email) == null
  }
}

module.exports = CreateAccount
