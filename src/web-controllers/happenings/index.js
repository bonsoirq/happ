const ListHappenings = require('../../interactors/list-happenings')

async function index (req, res, next) {
  const accountId = res.locals.accountId

  const happenings = await ListHappenings.call({ accountId })

  res.status(200).json(happenings)
}

module.exports = index
