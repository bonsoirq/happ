function isEmpty (value) {
  // eslint-disable-next-line no-unused-vars
  for (const _member of value) {
    return false
  }
  return true
}

function notEmpty (value) {
  return !isEmpty(value)
}

module.exports = {
  isEmpty,
  notEmpty
}
