const Interactor = require('./interactor')
const HappeningRepo = require('../repositories/happening-repo')
const { Failure, Success } = require('../utils/result')
const { UNAUTHORIZED } = require('../enums/validation-error')

class PublishHappening extends Interactor {
  constructor ({ happeningId, accountId, isPublished },
    { repository = HappeningRepo } = {}) {
    super()
    this.happeningId = happeningId
    this.accountId = accountId
    this.isPublished = isPublished
    this._repo = repository
  }

  async call () {
    const happening = await this._repo.findById(this.happeningId)

    if (happening.accountId !== this.accountId) {
      return Failure(UNAUTHORIZED)
    } else {
      happening.isPublished = this.isPublished
      await this._repo.update(happening)
      return Success(happening)
    }
  }
}

module.exports = PublishHappening
