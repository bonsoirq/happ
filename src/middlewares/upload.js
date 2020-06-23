const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage })

module.exports = class Upload {
  static file (fieldName = 'file') {
    return upload.single(fieldName)
  }
}
