import axios from 'axios'

axios.defaults.timeout = 7000
axios.defaults.baseURL = ''
// http request 拦截器
axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    return config
  }, err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  }
  // error => {
  //   if (error.response.status === 404) {
  //   } else {
  //     window.location.reload()
  //     return Promise.reject(error)
  //   }
  // }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}
