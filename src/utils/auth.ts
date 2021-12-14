import Cookies from 'js-cookie'
import tokenKeys from '@/api/token'
import { compileStr, uncompileStr } from '@/utils/'

const { cookieKey, remember, rememberDay } = tokenKeys
interface CookieData {
  username: string
  password: string
}

// 获取token
export function getToken(): string | undefined {
  return Cookies.get(cookieKey)
}
// 设置token
export function setToken(token: string) {
  return Cookies.set(cookieKey, token)
}
// 删除token
export function removeToken() {
  return Cookies.remove(cookieKey)
}

// 获取账号密码
export function getRemember() {
  const data = Cookies.get(remember)
  let loginData: CookieData | undefined = { username: '', password: '' }
  if (data) {
    try {
      const parseData = JSON.parse(uncompileStr(data))
      loginData.username = uncompileStr(parseData.u)
      loginData.password = uncompileStr(parseData.p)
    } catch (e) {
      loginData = undefined
    }
  }
  return loginData
}

// 记住账号密码
export function setRemember(username: string, password: string) {
  return Cookies.set(
    remember,
    compileStr(JSON.stringify({ u: compileStr(username), p: compileStr(password) })),
    { expires: rememberDay }
  )
}

// 清除账号密码
export function removeRemember() {
  return Cookies.remove(remember)
}
