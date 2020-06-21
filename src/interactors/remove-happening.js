const Interactor = require('./interactor')
const HappeningRepo = require('../repositories/happening-repo')
const { Success, Failure } = require('../utils/result')
const { NOT_FOUND, UNAUTHORIZED } = require('../enums/validation-error')

class RemoveHappening extends Interactor {
  constructor ({ id, accountId }, { repository = HappeningRepo } = {}) {
    super()
    this.id = id
    this.accountId = accountId
    this._repo = repository
  }

  async call () {
    const { accountId } = await this._repo.findById(this.id)
    if (accountId === this.accountId) {
      const isSuccess = await this._repo.remove(this.id)
      if (isSuccess) {
        return Success()
      } else {
        return Failure(NOT_FOUND)
      }
    } else {
      return Failure(UNAUTHORIZED)
    }
  }
}

module.exports = RemoveHappening
