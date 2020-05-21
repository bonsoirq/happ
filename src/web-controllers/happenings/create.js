const CreateHappening = require('../../interactors/create-happening')

async function create (req, res, next) {
  const params = {
    accountId: res.locals.accountId,
    name: req.body.name,
    description: req.body.description,
    organizerDescription: req.body.organizerDescription,
    agenda: req.body.agenda
  }

  const result = await CreateHappening.call(params)

  renderJson(params, result, res)
}

function renderJson (params, result, res) {
  if (result.isSuccess) {
    res.status(201).json({
      data: result.value()
    })
  } else {
    res.status(422).json({
      errors: result.reason(),
      data: params
    })
  }
}

module.exports = create
