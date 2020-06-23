const filetype = require('file-type')

class UnknownFileTypeError extends Error {}

const isFileExt = (buffer, ...extensions) => {
  return filetype
    .fromBuffer(buffer)
    .then(data => {
      if (data == null) {
        throw new UnknownFileTypeError()
      } else {
        return extensions.includes(data.ext)
      }
    })
}

module.exports = { isFileExt }
