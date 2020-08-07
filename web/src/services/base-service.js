export default class BaseService {
  static get url () {
    return process.env.REACT_APP_API_URL
  }

  static get(path) {
    return fetch(`${this.url}/${path}`, {
        credentials: 'include',
        headers: {
          'Access-Control-Allow-Origin': this.url,
          'Access-Control-Allow-Headers': '*'
        }
      })
      .then(response => response.json())
      .then(({ data }) => data)
  }

  static post(path, data) {
    return fetch(`${this.url}/${path}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': this.url,
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(({ data }) => data)
  }

  static put(path, data) {
    return fetch(`${this.url}/${path}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': this.url,
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(({ data }) => data)
  }

  static delete(path) {
    return fetch(`${this.url}/${path}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': this.url,
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json'
      },
    })
  }
}
