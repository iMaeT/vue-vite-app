import { defineStore } from 'pinia'
import { usePermissionStore } from './permission'
import type { Token, UserId, UserName, UserRoles, LoginFormModule, IUserInfoData } from '@/@types'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { loginApi, getInfo, logoutApi } from '@/api/user'
import { resetRouter } from '@/router'
import tokenKeys from '@/api/token'
import { pinia } from '../index'

const { resKey, resCheck } = tokenKeys

type UserState = {
  token: Token
  userId: UserId
  userName: UserName
  roles: UserRoles
}
export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: getToken(),
    userId: undefined,
    userName: '',
    roles: []
  }),
  getters: {
    getUserId(): UserId {
      return this.userId
    },
    getUserName(): UserName {
      return this.userName
    },
    getRoles(): UserRoles {
      return this.roles
    }
  },
  actions: {
    // 重置状态
    RESET_STATE() {
      this.token = getToken()
      this.userName = ''
      this.userId = undefined
      this.roles = []
    },
    SET_TOKEN(token: Token) {
      this.token = token
    },
    SET_USERNAME(name: UserName) {
      this.userName = name
    },
    SET_USERID(id: UserId) {
      this.userId = id
    },
    SET_ROLES(roles: UserRoles) {
      this.roles = roles
    },
    // 用户登录
    login(userInfo: LoginFormModule): Promise<unknown> {
      return new Promise((resolve, reject) => {
        loginApi({ data: userInfo })
          .then((response) => {
            const { data } = response.data // data:为服务器返回数据的data
            // // 判断是否从响应头信息拿 token (若从响应头获取 token,key为全小写)
            const token = resCheck ? response.headers[resKey.toLocaleLowerCase()] : data.token
            if (!token) {
              reject('登录失败，请重新尝试！')
              return
            }
            this.SET_TOKEN(token) // 保存token状态
            setToken(token) // 写入cookie
            resolve(data)
          })
          .catch((error) => {
            // 登录失败
            reject(error)
          })
      })
    },
    // 获取用户信息
    getUserInfo(token?: Token): Promise<IUserInfoData> {
      if (token) {
        this.SET_TOKEN(token) // 保存token状态
        setToken(token) // 写入cookie
      }
      return new Promise((resolve, reject) => {
        getInfo({}).then((res) => {
          const { data } = res.data
          if (!data) {
            return reject('Verification failed, please Login again.')
          }
          const { user, permissions: roles } = data
          const { id, name } = user
          this.SET_ROLES(roles)
          this.SET_USERID(id)
          this.SET_USERNAME(name)

          resolve(data as IUserInfoData)
        })
      })
    },
    // 用户注销
    logout(): Promise<unknown> {
      return new Promise((resolve, reject) => {
        logoutApi({})
          .then(() => {
            removeToken() // 必须先 remove  token
            resetRouter() // 重置路由
            this.RESET_STATE() // 重置 user 状态
            resolve(undefined)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 删除 token
    resetToken(): Promise<unknown> {
      return new Promise((resolve) => {
        removeToken() // 必须先 remove  token
        resetRouter() // 重置路由
        this.RESET_STATE() // 重置 user 状态
        resolve(undefined)
      })
    },
    // 动态修改权限
    changeRoles(roles: UserRoles): Promise<unknown> {
      return new Promise(async (resolve) => {
        resetRouter() // 重置路由
        // 根据角色生成可访问的路线图
        const permissionStore = usePermissionStore()
        const accessRoutes = await permissionStore.generateRoutes(roles)
        resolve(accessRoutes)
      })
    }
  }
})

// 在components 外部使用 store 需要先创建 pinia
// https://pinia.esm.dev/core-concepts/outside-component-usage.html#single-page-applications
export function useUserStoreExternal() {
  return useUserStore(pinia)
}
