const { isFileExt } = require('../../utils/is-file-ext')
const { PNG, JPG } = require('../../enums/file-ext')

async function create (req, res, next) {
  const { buffer } = req.file

  if (await isFileExt(buffer, PNG, JPG)) {
    // TODO: Persist valid image and connect with entity
    res.status(201).send()
  } else {
    res.status(422).send()
  }
}

module.exports = create
