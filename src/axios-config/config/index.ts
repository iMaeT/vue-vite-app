/**
 * request全局配置
 */
import { ConfigOptions } from './types'

const config: ConfigOptions = {
  /**
   * api请求基础路径
   */
  base_url: {
    // 开发环境接口前缀
    // dev: 'https://api.apiopen.top',
    dev: (import.meta.env.VITE_API_BASEPATH as string) || 'dev-api',
    // 开发打包测试环境接口前缀
    // dev: 'https://api.apiopen.top',
    devpro: (import.meta.env.VITE_API_BASEPATH as string) || 'devpro-api',
    // 生产环境接口前缀
    pro: (import.meta.env.VITE_API_BASEPATH as string) || 'prod-api',
    // 测试环境接口前缀
    test: 'http://mockjs.test.cn'
  },

  /**
   * 接口成功返回状态码
   */
  result_code: 0,

  /**
   * 接口请求超时时间
   */
  request_timeout: 20000,

  /**
   * message 持续时间
   */
  message_duration: 5000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  default_headers: 'application/json'
}

export default config
