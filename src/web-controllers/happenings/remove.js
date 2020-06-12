const RemoveHappening = require('../../interactors/remove-happening')
const { UNAUTHORIZED } = require('../../enums/validation-error')

async function remove (req, res, next) {
  const params = {
    accountId: res.locals.accountId,
    id: req.params.id
  }

  const result = await RemoveHappening.call(params)

  renderJson(params, result, res)
}

function renderJson (params, result, res) {
  if (result.isSuccess) {
    res.status(200).json({
      data: result.value()
    })
  } else {
    const statusCode = (result.reason() == UNAUTHORIZED) ? 403 : 404
    res.status(statusCode).json({
      errors: result.reason(),
      data: params
    })
  }
}

module.exports = remove
