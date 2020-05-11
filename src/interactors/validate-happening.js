const Interactor = require('./interactor')
const AccountRepo = require('../repositories/account-repo')
const { Maybe } = require('../utils/maybe')
const { Success, Failure } = require('../utils/result')
const { isString } = require('../utils/is-string')
const { isEmpty, notEmpty } = require('../utils/is-empty')
const { NOT_FOUND, NOT_STRING, EMPTY } = require('../enums/validation-error')

class ValidateHappening extends Interactor {
  constructor ({ happening },
    { accountRepository = AccountRepo }) {
    super()
    this.happening = happening
    this.errors = {}
    this._accountRepo = accountRepository
  }

  async call () {
    const { name, description, organizerDescription, agenda } = this.happening
    await this.accountExists()
    this.fieldIsNotEmptyString('name', name)
    this.fieldIsNotEmptyString('description', description)
    this.fieldIsNotEmptyString('organizerDescription', organizerDescription)
    this.fieldIsNotEmptyString('agenda', agenda)

    const isValid = isEmpty(Object.entries(this.errors))

    return isValid ? Success(this.happening) : Failure({ ...this.errors })
  }

  async accountExists () {
    const { accountId } = this.happening
    const notFound = Maybe(await this._accountRepo.findById(accountId)).isNone
    if (notFound) {
      this.errors.accountId = [NOT_FOUND]
    }
  }

  fieldIsNotEmptyString (fieldName, value) {
    const result = Success(value)
      .bind(x => isString(x) ? Success(x) : Failure([NOT_STRING]))
      .bind(x => notEmpty(x) ? Success(x) : Failure([EMPTY]))

    if (result.isFailure) {
      this.errors[fieldName] = result.reason()
    }
  }
}

module.exports = ValidateHappening
