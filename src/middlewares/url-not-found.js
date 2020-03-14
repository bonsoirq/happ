function urlNotFound (_req, res, _next) {
  res.status(404)
  res.send('Url not found.')
}

module.exports = {
  urlNotFound
}
