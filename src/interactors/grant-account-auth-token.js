const Interactor = require('./interactor')
const AccountRepo = require('../repositories/account-repo')
const AccountCredentialsAreValid = require('./account-credentials-are-valid')
const GenerateAuthToken = require('./generate-auth-token')
const { Success, Failure } = require('../utils/result')

class GrantAccountAuthToken extends Interactor {
  constructor ({ email, password },
    {
      repository = AccountRepo,
      credentialsValidator = new AccountCredentialsAreValid({ email, password })
    } = {}) {
    super()
    this.email = email
    this._repo = repository
    this._credentialsValidator = credentialsValidator
  }

  async call () {
    const credentialsValid = await this._credentialsValidator.call()

    if (credentialsValid) {
      const account = await this._repo.findByEmail(this.email)

      const token = await GenerateAuthToken.call({
        resourceId: account.id,
        expiresAt: new Date(Date.now() + 3600 * 1000)
      })

      return Success(token)
    }
    return Failure()
  }
}

module.exports = GrantAccountAuthToken
