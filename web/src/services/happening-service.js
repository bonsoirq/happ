import BaseService from "services/base-service";
import Happening from "entities/happening";

export default class HappeningService extends BaseService {
  static list() {
    return this.get('happenings')
      .then(attributes => attributes.map(x => new Happening(x)))
  }
}
