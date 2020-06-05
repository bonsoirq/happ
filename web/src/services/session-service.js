import BaseService from "services/base-service";

export default class SessionService extends BaseService {
  static logIn({ email, password }) {
    return this.post('sessions', { email, password })
  }
}
