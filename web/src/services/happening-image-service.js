import BaseService from "services/base-service";

export default class HappeningImageService extends BaseService {
  static create({ happeningId, data }) {
    const path = `happenings/${happeningId}/image`
    return fetch(`${this.url}/${path}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': this.url,
        'Access-Control-Allow-Headers': '*',
      },
      body: data
    })
    .then(response => console.log(response))
  }
}
