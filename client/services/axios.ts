import axios, { AxiosResponse } from 'axios'

const baseURL = 'http://SE1-Shop-api:3001/'

const request = axios.create({
  baseURL,
  timeout: 50000,
})

request.interceptors.response.use(
  response => {
    console.log(`response for ${response.config.url}`, response)
    return response
  },
  error => {
    console.log(error.response)
    return Promise.reject(error)
  }
)

request.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      config.baseURL = 'http://localhost:3001/'
      const token = localStorage.getItem('jwt')
      if (token) {
        if (config.headers) {
          config.headers.Authorization = 'Bearer ' + String(token)
        }
      }
    }
    console.log(`${config.url}`)
    return config
  },
  error => Promise.reject(error)
)

export type RequestReturnType<T> = Promise<AxiosResponse<T>>

export default request
