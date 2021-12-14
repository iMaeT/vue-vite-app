import router from '@/router'
import { useUserStoreExternal } from '@/store/modules/user'
import { usePermissionStoreExternal } from '@/store/modules/permission'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // NProgress bar style
import { getToken } from '@/utils/auth'

import type { RouteRecordRaw } from 'vue-router'
import { Message } from './components/Message'

NProgress.configure({ showSpinner: true }) // NProgress configuration

const whiteList = ['/login'] // 不重定向白名单
const userStore = useUserStoreExternal() // user store
const permissionStore = usePermissionStoreExternal() // permission store

router.beforeEach(async (to, from, next) => {
  // 开启进度条
  NProgress.start()
  // 确定用户是否已经登录
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // 如果已经登录，重定向到首页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 确定用户是否已经通过 getInfo 获取到权限
      const hasRoles = userStore.roles && userStore.roles.length > 0
      if (hasRoles) {
        next()
        return
      }
      try {
        // 获取用户信息
        // 注意：roles 必须是一个数组，比如：['admin'], ['admin', 'test']
        const { permissions: roles } = await userStore.getUserInfo()
        // 根据角色生成可访问路由图
        const accessRoutes = await permissionStore.generateRoutes(roles)
        accessRoutes.forEach(async (route) => {
          // 动态添加可访问路由表
          await router.addRoute(route as RouteRecordRaw)
        })
        const redirectPath = from.query.redirect || to.path
        const redirect = decodeURIComponent(redirectPath as string)
        // hack方法，以确保 addRoutes 是完整的
        // 设置 replace: true，这样导航就不会留下历史记录
        const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
        next(nextData)
      } catch (error) {
        // 删除 token，进入登录页面重新登录
        await userStore.resetToken()
        Message.error('Error')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 否则全部重定向到登录页
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
