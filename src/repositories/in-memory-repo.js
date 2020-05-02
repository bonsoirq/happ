class InMemoryRepo {
  constructor () {
    this.map = new Map()
  }

  async add (entity) {
    this.map.set(entity.id, entity)
    return true
  }

  async count () {
    return this.map.size
  }
}

module.exports = InMemoryRepo
