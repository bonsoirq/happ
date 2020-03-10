const { InvalidArgumentError } = require('../errors')

function toInt (value, radix = 10) {
  const result = parseInt(value, radix)
  if (isNaN(result)) {
    throw new InvalidArgumentError(`Value ${value} at radix ${radix} cannot be parsed into an interger.`)
  }
  return result
}

module.exports = {
  toInt
}
