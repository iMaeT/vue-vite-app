import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { AppRouteRecordRaw } from './types'

/**
* redirect: noredirect        当设置 noredirect 的时候该路由在面包屑导航中不可被点击
* name:'router-name'          设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
* meta : {
    hidden: true              当设置 true 的时候该路由不会再侧边栏出现 如404，login等页面(默认 false)
    alwaysShow: true          当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式，
                              只有一个时，会将那个子路由当做根路由显示在侧边栏，
                              若你想不管路由下面的 children 声明的个数都显示你的根路由，
                              你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，
                              一直显示根路由(默认 false)
    title: 'title'            设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'          设置该路由的图标
    noCache: true             如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb: false         如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
    affix: true               如果设置为true，则会一直固定在tag项中(默认 false)
    noTagsView: true           如果设置为true，则不会出现在tag中(默认 false)
    activeMenu: '/dashboard'  显示高亮的路由路径
    followAuth: '/dashboard'  跟随哪个路由进行权限过滤
    showMainRoute: true       设置为true即使hidden为true，也依然可以进行路由跳转(默认 false)
    followRoute: '/dashboard' 为路由设置跟随其他路由的权限
    roles: ['admin','editor'] 设置该路由进入的权限，支持多个权限叠加
  }
**/
/** layout  */
import Layout from '@/layout/index.vue'

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    component: Layout,
    redirect: '/dashboard',
    meta: {},
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'dashboard',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
      title: '登录',
      noTagsView: true
    }
  },
  {
    path: '/external-link',
    component: Layout,
    meta: {},
    children: [
      {
        path: 'http://8.133.179.48:4000/dist-doc/',
        meta: { title: '文档', icon: 'documentation' }
      }
    ]
  },
  {
    path: '/guide',
    name: 'Guide',
    component: Layout,
    meta: {},
    children: [
      {
        path: 'index',
        component: () => import('_v/guide/index.vue'),
        name: 'GuideDemo',
        meta: {
          title: '引导页',
          icon: 'guide'
        }
      }
    ]
  }
]
export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/components-demo',
    component: Layout,
    redirect: '/components-demo/echarts',
    name: 'ComponentsDemo',
    meta: {
      title: '功能组件',
      icon: 'component',
      alwaysShow: true
    },
    roles: [],
    children: [
      {
        path: 'echarts',
        component: () => import('_v/components-demo/echarts/index.vue'),
        name: 'EchartsDemo',
        meta: {
          title: '图表'
        }
      }
    ]
  }
]

// https://next.router.vuejs.org/zh/api/#history
const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[]
})

export function resetRouter(): void {
  const resetWhiteNameList = ['Login', 'Dashboard', 'Page404']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export function setupRouter(app: App<Element>) {
  app.use(router)
}

export default router
