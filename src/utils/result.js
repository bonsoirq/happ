class Result {
  constructor (value) {
    this._value = value
  }

  get isSuccess () { return this instanceof Success }
  get isFailure () { return this instanceof Failure }

  map (fn) {
    if (this.isFailure) {
      return this
    }
    return new Success(fn(this._value))
  }

  bind (fn) {
    if (this.isFailure) {
      return this
    }
    return fn(this._value)
  }

  valueOr (otherValue) {
    if (this.isSuccess) {
      return this._value
    } else {
      return otherValue
    }
  }
}

class Success extends Result {
  value () {
    return this._value
  }
}

class Failure extends Result {
  reason () {
    return this._value
  }
}

class ResultFactory {
  static Success (value) { return new Success(value) }
  static Failure (value) { return new Failure(value) }
}

module.exports = ResultFactory
