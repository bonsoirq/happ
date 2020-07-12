const { isFileExt } = require('../../utils/is-file-ext')
const { PNG, JPG } = require('../../enums/file-ext')
const CreateHappeningImage = require('../../interactors/create-happening-image')

// TODO: Discuss max accepted file size and validate it
async function create (req, res, next) {
  const { buffer } = req.file

  if (await isFileExt(buffer, PNG, JPG)) {
    // TODO: Write utility function to get buffer extension
    const extension = await isFileExt(buffer, PNG) ? PNG : JPG

    await CreateHappeningImage.call({
      fileBuffer: buffer,
      extension,
      accountId: res.locals.accountId,
      happeningId: req.params.happeningId
    })

    // TODO: Should we respond with JSON when content-type is multipart?
    res.status(201).send()
  } else {
    res.status(422).send()
  }
}

module.exports = create
