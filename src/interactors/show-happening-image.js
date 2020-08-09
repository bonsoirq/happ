const Interactor = require('./interactor')
const AccountRepo = require('../repositories/account-repo')
const HappeningImageRepo = require('../repositories/happening-image-repo')
const HappeningRepo = require('../repositories/happening-repo')
const FileBufferRepo = require('../repositories/file-buffer-repo')
const { Failure, Success } = require('../utils/result')
const { UNAUTHORIZED, NOT_FOUND } = require('../enums/validation-error')

class ShowHappeningImage extends Interactor {
  constructor ({ accountId, happeningId },
    {
      repository = HappeningImageRepo,
      happeningRepository = HappeningRepo,
      accountRepository = AccountRepo,
      fileBufferRepository = FileBufferRepo
    } = {}) {
    super()
    this.accountId = accountId
    this.happeningId = happeningId

    this._repo = repository
    this._accountRepo = accountRepository
    this._happeningRepo = happeningRepository
    this._fileRepo = fileBufferRepository
  }

  async call () {
    if (await this.canPerformAction()) {
      const happeningImage = await this._repo.findByHappeningId(this.happeningId)
      if (happeningImage == null) {
        return Failure(NOT_FOUND)
      }
      const path = this._fileRepo.path(happeningImage.path)
      return Success(path)
    } else {
      return Failure(UNAUTHORIZED)
    }
  }

  async canPerformAction () {
    const [happening, account] = await Promise.all([
      this._happeningRepo.findById(this.happeningId),
      this._accountRepo.findById(this.accountId)
    ])

    const bothExist = happening != null && account != null
    const happeningBelongsToAccount = bothExist && happening.accountId === account.id

    return happeningBelongsToAccount || happening.isPublished
  }
}

module.exports = ShowHappeningImage
