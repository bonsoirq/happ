export default class BaseService {
  static get url () {
    return process.env.REACT_APP_API_URL
  }

  static get(path) {
    return fetch(`${this.url}/${path}`)
      .then(response => response.json())
      .then(({ data }) => data)
  }


  static post(path, data) {
    return fetch(`${this.url}/${path}`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(({ data }) => data)
  }
}
