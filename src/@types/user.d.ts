// user store
export type Token = string | undefined
export type UserId = number | undefined
export type UserName = string
export type UserRoles = string[]
// 获取到的用户信息
export interface IUserInfoData {
  user: {
    id: number
    name: string
    gender: number
  }
  permissions: string[]
  avatars: string
}
// 登录表单
export interface LoginFormModule {
  username: String
  password: String
}
