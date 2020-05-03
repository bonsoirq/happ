class Maybe {
  constructor (value) {
    this._value = value
  }

  static get None () {
    return Maybe.of(null)
  }

  static of (value) {
    return new Maybe(value)
  }

  get value () {
    return this.isNone ? null : this._value
  }

  map (fn) {
    if (this.isNone) {
      return Maybe.None
    }
    return Maybe.of(fn(this._value))
  }

  or (value) {
    if (this.isNone) {
      return Maybe.of(value)
    }
    return Maybe.of(this._value)
  }

  ifSome (fn) {
    if (this.isSome) {
      fn(this._value)
    }
    return Maybe.of(this._value)
  }

  ifNone (fn) {
    if (this.isNone) {
      fn(this._value)
    }
    return Maybe.of(this._value)
  }

  get isNone () {
    return this._value == null
  }

  get isSome () {
    return !this.isNone
  }
}

module.exports = Maybe
