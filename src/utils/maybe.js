class Maybe {
  constructor (value) {
    this._value = value
  }

  static get Nothing () {
    return Maybe.of(null)
  }

  static of (value) {
    return new Maybe(value)
  }

  get value () {
    return this.isNothing ? null : this._value
  }

  map (fn) {
    if (this.isNothing) {
      return Maybe.Nothing
    }
    return Maybe.of(fn(this._value))
  }

  or (value) {
    if (this.isNothing) {
      return Maybe.of(value)
    }
    return Maybe.of(this._value)
  }

  get isNothing () {
    return this._value == null
  }
}

module.exports = Maybe
