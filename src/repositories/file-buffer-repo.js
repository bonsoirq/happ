const fs = require('fs').promises
const path = require('path')
const { Environment } = require('../config')

class FileBufferRepo {
  constructor (root) {
    this.root = root
  }

  async add (fileName, buffer) {
    const filePath = path.join(this.root, fileName)
    await fs.writeFile(filePath, buffer)
  }

  async findByName (name) {
    const filePath = path.join(this.root, name)

    return fs
      .readFile(filePath)
      .catch(() => null)
  }
}

module.exports = new FileBufferRepo(Environment.uploadDirectory)
