const Interactor = require('./interactor')
const HappeningImage = require('../entities/happening-image')
const AccountRepo = require('../repositories/account-repo')
const HappeningRepo = require('../repositories/happening-repo')
const HappeningImageRepo = require('../repositories/happening-image-repo')
const FileBufferRepo = require('../repositories/file-buffer-repo')
const { Failure, Success } = require('../utils/result')
const { UNAUTHORIZED } = require('../enums/validation-error')

// TODO: Resize image to 3:1 ratio
// TODO: Overwrite file if image for happening already exists
class CreateHappeningImage extends Interactor {
  constructor ({ fileBuffer, extension, accountId, happeningId },
    {
      repository = HappeningImageRepo,
      happeningRepository = HappeningRepo,
      accountRepository = AccountRepo,
      fileBufferRepository = FileBufferRepo
    } = {}) {
    super()
    this.accountId = accountId
    this.happeningImage = new HappeningImage({ happeningId })
    this.buffer = fileBuffer
    this.fileName = `${this.happeningImage.id}.${extension}`
    this._repo = repository
    this._accountRepo = accountRepository
    this._happeningRepo = happeningRepository
    this._fileRepo = fileBufferRepository
  }

  async call () {
    if (await this.happeningBelongsToAccount()) {
      const { fileName } = this
      this.happeningImage.path = fileName
      await this._fileRepo.add(fileName, this.buffer)
      await this._repo.removeByHappeningId(this.happeningImage.happeningId)
      await this._repo.add(this.happeningImage)
      return Success()
    } else {
      return Failure(UNAUTHORIZED)
    }
  }

  async happeningBelongsToAccount () {
    const [happening, account] = await Promise.all([
      this._happeningRepo.findById(this.happeningImage.happeningId),
      this._accountRepo.findById(this.accountId)
    ])

    const bothExist = happening != null && account != null
    return bothExist && happening.accountId === account.id
  }
}

module.exports = CreateHappeningImage
