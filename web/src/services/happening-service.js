import BaseService from "services/base-service";
import Happening from "entities/happening";

export default class HappeningService extends BaseService {
  static list() {
    return this.get('happenings')
      .then(attributes => attributes.map(x => new Happening(x)))
  }

  static create({ name, description, organizerDescription, agenda }) {
    return this.post('happenings', { name, description, organizerDescription, agenda })
      .then(attributes => new Happening(attributes))
  }

  static save(happening) {
    return this.put(`happenings/${happening.id}`, happening)
  }

  static remove(id) {
    return this.delete(`happenings/${id}`)
  }
}
