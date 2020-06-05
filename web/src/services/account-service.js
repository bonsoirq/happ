import BaseService from "services/base-service";
import Account from "entities/account";

export default class AccountService extends BaseService {
  static create({ name, email, password }) {
    return this.post('accounts', { name, email, password })
      .then(attributes => new Account(attributes))
  }

  static current() {
    return this.get('accounts/my')
      .then(attributes => new Account(attributes))
  }
}
