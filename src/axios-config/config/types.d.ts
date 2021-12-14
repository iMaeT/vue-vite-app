/**
 * request配置
 */
type BaseUrlObj = {
  dev: string
  devpro: string
  pro: string
  test: string
}
export interface ConfigOptions {
  base_url: BaseUrlObj
  result_code: number | string
  default_headers: string
  request_timeout: number
  message_duration: number
}
