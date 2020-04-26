class Interactor {
  static async call (...args) {
    return new this(...args).call()
  }

  async call () {
    throw new Error('Has to be implemented in derived class!')
  }
}

module.exports = Interactor
