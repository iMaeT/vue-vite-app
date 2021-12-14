import { fetch } from '@/axios-config/axios'

const accountBaseUrl = '/api/account/'
const userBaseUrl = '/api/base/'

// 登录
export const loginApi = ({ data }: PropsData) => {
  return fetch({
    url: `${accountBaseUrl}login`,
    method: 'post',
    data
  })
}

// 获取用户信息
export const getInfo = ({ params }: PropsData) => {
  return fetch({
    url: `${accountBaseUrl}login/user`,
    method: 'get',
    params
  })
}

// 退出登录

export const logoutApi = ({ data }: PropsData) => {
  return fetch({
    url: `${accountBaseUrl}logout`,
    method: 'post',
    data
  })
}

// 修改密码
export const setPassword = ({ data }: PropsData) => {
  return fetch({
    url: `${accountBaseUrl}password`,
    method: 'put',
    data
  })
}

// 修改用户信息
export const setInfo = ({ data }: PropsData) => {
  return fetch({
    url: `${userBaseUrl}user`,
    method: 'put',
    data
  })
}
