const FindPublicHappening = require('../../interactors/find-public-happening')

async function index (req, res, next) {
  const happeningId = req.params.id

  const result = await FindPublicHappening.call({ happeningId })

  renderJson(result, res)
}

function renderJson (result, res) {
  if (result.isSuccess) {
    res.status(200).json({
      data: result.value()
    })
  } else {
    res.status(404).json({})
  }
}

module.exports = index
