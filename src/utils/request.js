import axios from 'axios'
import { Message} from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
})

service.interceptors.request.use(
  config => {
    // config.headers['Authorization'] = getToken()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    // 状态值判断
    switch (res.code) {
      case 200:
        return res
      case 400:
        if (res.errCode === "TOKEN_FAIL") { // token过期
          Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
          // 清除token
          // window.sessionStorage.removeItem('SET_TOKEN')
          // 强制跳转到login
          // router.push({ path: '/login' })
        } else {
          return Promise.reject(new Error(res.message || res.errmsg || 'Error'))
        }
        break
      default:
        return Promise.reject(new Error(res.message || res.errmsg || 'Error'))
    }
  },
  error => {
    console.log(error.response, 'error.response')
    console.log('err__' + error) // for debug
    return Promise.reject(error)
  }
)

/**
 * @param {string} url
 * @param {object} params
 */
export function post(url, params) {
  return service({
    method: 'post',
    url,
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  })
}

/**
 * @param {string} url
 * @param {object} params
 */
export function _delete (url, params) {
  return service({
    method: 'delete',
    url,
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  })
}

export default service
