import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

import { Message } from '@/components/Message'

import qs from 'qs'

import config from './config'

import { showFullScreenLoading, tryHideFullScreenLoading } from '@/utils/loading'

import tokenKeys from '@/api/token'
import { useUserStoreExternal } from '@/store/modules/user'

const { reqKey } = tokenKeys

const { result_code, base_url } = config

export const PATH_URL: string = base_url[import.meta.env.MODE as string]

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: PATH_URL, // api 的 base_url
  withCredentials: true, // 当跨域请求时发送cookie
  timeout: config.request_timeout // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    showFullScreenLoading()

    const userStore = useUserStoreExternal() // user store
    const storeToken = userStore.token
    // 发送请求之前的操作
    if (storeToken && config.headers) {
      // 让每个请求携带 token
      // header 是一个自定义请求头 key
      // 请根据实际情况修改
      config.headers[reqKey] = storeToken
    }
    if (
      config.method === 'post' &&
      config.headers &&
      config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
    ) {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  (error: AxiosError) => {
    tryHideFullScreenLoading()
    // 处理请求错误
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    tryHideFullScreenLoading()
    const res = response.data

    // 如果自定义代码不是 result_code ,则判断为错误。
    if (res.code !== result_code) {
      Message.error(res.msg)
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      // 成功
      return response
    }
  },
  (error: AxiosError) => {
    tryHideFullScreenLoading()
    console.log('err' + error) // for debug
    // 请求超时、断网处理
    if (!error.response) {
      // 请求超时状态
      if (error.message.includes('timeout')) {
        Message({
          message: '请求超时，请稍后重试！',
          type: 'error',
          duration: config.message_duration
        })
      }
      return
    }
    Message({
      message: error.message,
      type: 'error',
      duration: config.message_duration
    })
    return Promise.reject(error)
  }
)

export default service
