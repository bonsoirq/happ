function isUUID (value) {
  const regex = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i
  return regex.test(value)
}

module.exports = { isUUID }
