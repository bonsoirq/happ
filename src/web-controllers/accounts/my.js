const ShowAccount = require('../../interactors/show-account')

async function my (req, res, next) {
  const params = {
    accountId: res.locals.accountId
  }

  const result = await ShowAccount.call(params)

  renderJson(params, result, res)
}

function renderJson (params, result, res) {
  if (result.isSuccess) {
    res.status(200).json({
      data: result.value()
    })
  } else {
    res.status(404).send()
  }
}

module.exports = my
