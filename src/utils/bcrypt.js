const bcrypt = require('bcrypt')

async function hash (plainText, numOfRounds = 15) {
  return bcrypt.hash(plainText, numOfRounds)
}

async function compare (plainText, encryptedText) {
  return bcrypt.compare(plainText, encryptedText)
}

module.exports = {
  compare,
  hash
}
