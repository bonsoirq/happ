class Maybe {
  constructor (value) {
    this._value = value
  }

  bind (fn) {
    if (this.isNone) {
      return this
    }
    return fn(this._value)
  }

  map (fn) {
    if (this.isNone) {
      return this
    }
    return new Maybe(fn(this._value))
  }

  valueOr (value) {
    if (this.isNone) {
      return value
    }
    return this._value
  }

  value () {
    if (this.isSome) {
      return this._value
    }
    throw new Error('Cannot unwrap value of None()')
  }

  get isNone () {
    return this._value == null
  }

  get isSome () {
    return !this.isNone
  }
}

class MaybeFactory {
  static Maybe (value) {
    return new Maybe(value)
  }

  static None () {
    return new Maybe()
  }

  static Some (value) {
    if (value == null) {
      throw Error('Cannot wrap nullish value in Some()')
    }
    return new Maybe(value)
  }
}

module.exports = MaybeFactory
