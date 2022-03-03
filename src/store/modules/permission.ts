import { defineStore } from 'pinia'
import { constantRouterMap, asyncRouterMap } from '@/router'
import { AppRouteRecordRaw } from '@/router/types'
import { pinia } from '../index'

import type { UserRoles } from '@/@types'

export interface PermissionState {
  routes: AppRouteRecordRaw[]
  addRoutes: AppRouteRecordRaw[]
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    routes: [],
    addRoutes: []
  }),
  getters: {
    getPermissionRoutes(): AppRouteRecordRaw[] {
      return this.routes
    },
    getAddRoutes(): AppRouteRecordRaw[] {
      return this.addRoutes
    }
  },
  actions: {
    SET_ROUTES(routes: AppRouteRecordRaw[]) {
      this.addRoutes = routes
      this.routes = constantRouterMap.concat(routes)
    },
    // 递归遍历路由
    generateRoutes(roles: UserRoles): Promise<AppRouteRecordRaw[]> {
      return new Promise((resolve) => {
        // 路由权限控制
        const accessedRoutes: AppRouteRecordRaw[] = filterAsyncRoutes(asyncRouterMap, roles)
        // 若'/'没有重定向,则重定向到第一个菜单,没有则404
        let num = 0
        const index = accessedRoutes.find((v, i) => {
          num = i
          return v.path === '/'
        })
        if (index && !index.redirect) {
          index.redirect = num
            ? accessedRoutes[0].path
            : accessedRoutes[1] && accessedRoutes[1].redirect !== '/404'
            ? accessedRoutes[1].path
            : '/404'
        }

        this.SET_ROUTES(accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
})

/**
 * 使用 meta.roles 确定当前用户是否具有权限
 * @param roles
 * @param route
 */
function hasPermission(roles: UserRoles, route: AppRouteRecordRaw): boolean {
  if (route.meta && route.meta.roles) {
    const metaRoles = route.meta.roles
    return roles.some((role) => metaRoles.includes(role))
  } else {
    return true
  }
}

/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
function filterAsyncRoutes(routes: AppRouteRecordRaw[], roles: UserRoles): AppRouteRecordRaw[] {
  const res: AppRouteRecordRaw[] = []

  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      if (!tmp.redirect) {
        // 写入重定向
        const redirectName = findFirstName(tmp)
        if (redirectName) {
          tmp.redirect = { name: redirectName }
        }
      }
      res.push(tmp)
    }
  })
  return res
}

/**
 * 寻找其子菜单中的第一个name
 * @param route 路由
 */
function findFirstName(route: AppRouteRecordRaw): Nullable<string | symbol> {
  let count = 0
  while (route.children && route.children[0]) {
    if (route.children[0].name && (route.children[0].path || count)) {
      return route.children[0].name
    } else {
      count++
      route = route.children[0]
    }
  }
  return null
}

export function usePermissionStoreExternal() {
  return usePermissionStore(pinia)
}
