const Interactor = require('./interactor')
const HappeningRepo = require('../repositories/happening-repo')

class ListHappenings extends Interactor {
  constructor ({ accountId },
    { repository = HappeningRepo } = {}) {
    super()
    this.accountId = accountId
    this._repo = repository
  }

  async call () {
    const happenings = await this._repo.findByAccountId(this.accountId)
    return happenings
  }
}

module.exports = ListHappenings
