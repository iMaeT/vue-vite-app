import { createApp } from 'vue'
import App from './App.vue'

import router, { setupRouter } from './router'
import { setupStore } from './store'
import { setupCustomGlobalComp } from './components/index'

import 'virtual:svg-icons-register'
import '@/styles/index.less'

import './permission' // 权限控制

// import { mockXHR } from '@/mock'
// mockXHR()

const app = createApp(App)

setupRouter(app) // 引入路由
setupStore(app) // 状态管理
setupCustomGlobalComp(app) // 引入全局自定义组件

// 路由器完成初始化导航时，返回一个 Promise
router.isReady().then(() => {
  app.mount('#app')
})
