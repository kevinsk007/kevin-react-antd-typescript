export interface RequestParams {
  url: string
  method: string
  body?: any
  headers?: any
}

const arrayParam = (k, arr) => {
  const parts = arr.map(item => encodeURIComponent(k) + '=' + encodeURIComponent(item))
  return parts.join('&')
}

const setParam = (uri, key, val) => {
  return uri
    .replace(
      RegExp('([?&]' + key + '(?=[=&#]|$)[^#&]*|(?=#|$))'),
      '&' + (val instanceof Array ? arrayParam(key, val) : key + '=' + encodeURIComponent(val)),
    )
    .replace(/^([^?&]+)&/, '$1?')
}

const baseRequest = (params: RequestParams) => {
  const { url = '', method, body, headers } = params
  const input = {
    headers: headers,
    method,
    body,
  }

  const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
      return response
    }

    const error: any = new Error(response.statusText ? response.statusText : `status: ${response.status}`)
    error.response = response
    error.request = input

    throw error
  }
  return fetch(url, input).then(checkStatus)
}

const request = (url, method, body?) => {
  let fetchUrl = url
  const isNeedBody = method !== 'GET' && method !== 'DELETE' && method !== 'PUT'
  if (!isNeedBody && typeof body !== 'undefined') {
    Object.keys(body).forEach(key => {
      let isMatch = false
      fetchUrl = fetchUrl.replace('${' + key + '}', () => {
        isMatch = true
        return body[key]
      })
      if (!isMatch) {
        fetchUrl = setParam(fetchUrl, key, body[key])
      }
    })
  }
  return baseRequest({
    url: fetchUrl,
    method,
    body: isNeedBody && body ? JSON.stringify(body) : undefined,
    headers: { 'Content-Type': 'application/json' },
  })
}

const requestJSON = (url, method, body?) => {
  return request(url, method, body)
    .then(response => {
      return response.json()
    })
    .then(err => err)
}
const requestFactory = {
  GET(url, data?) {
    return requestJSON(url, 'GET', data)
  },
  POST(url, data?) {
    return requestJSON(url, 'POST', data)
  },

  // const DELETE = (url: string, data?)=> requestJSON(url, 'DELETE', data)

  // const POST = (url, data?)=> requestJSON(url, 'POST', data)

  // const PUT = (url, data?)=> requestJSON(url, 'PUT', data)

  // const PATCH = (url, data?)=> requestJSON(url, 'PATCH', data)
}

export default requestFactory
