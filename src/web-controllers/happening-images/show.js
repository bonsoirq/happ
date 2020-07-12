const ShowHappeningImage = require('../../interactors/show-happening-image')

async function show (req, res, next) {
  const accountId = res.locals.accountId
  const happeningId = req.params.happeningId

  const result = await ShowHappeningImage.call({ accountId, happeningId })

  if (result.isSuccess) {
    res.sendFile(result.value())
  } else {
    res.status(404).send()
  }
}

module.exports = show
