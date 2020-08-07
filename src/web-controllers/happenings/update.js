const PublishHappening = require('../../interactors/publish-happening')

async function update (req, res, next) {
  const params = {
    accountId: res.locals.accountId,
    isPublished: req.body.isPublished,
    happeningId: req.params.id
  }

  const result = await PublishHappening.call(params)

  renderJson(params, result, res)
}

function renderJson (params, result, res) {
  if (result.isSuccess) {
    res.status(200).json({
      data: result.value()
    })
  } else {
    res.status(422).json({
      errors: result.reason(),
      data: params
    })
  }
}

module.exports = update
