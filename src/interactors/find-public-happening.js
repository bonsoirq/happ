const Interactor = require('./interactor')
const HappeningRepo = require('../repositories/happening-repo')
const { Failure, Success } = require('../utils/result')
const { NOT_FOUND } = require('../enums/validation-error')
const { isUUID } = require('../utils/is-uuid')

class FindPublicHappening extends Interactor {
  constructor ({ happeningId },
    { repository = HappeningRepo } = {}) {
    super()
    this.happeningId = happeningId
    this._repo = repository
  }

  async call () {
    const isValidUUID = isUUID(this.happeningId)
    if (!isValidUUID) {
      return Failure(NOT_FOUND)
    }

    const happening = await this._repo.findById(this.happeningId)

    if (happening == null || !happening.isPublished) {
      return Failure(NOT_FOUND)
    } else {
      return Success(happening)
    }
  }
}

module.exports = FindPublicHappening
