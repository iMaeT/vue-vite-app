<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        mode="vertical"
        @select="selectMenu"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

import { useSettingsStore } from '@/store/modules/settings'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { isExternal } from '@/utils/validate'

import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'

export default defineComponent({
  name: 'Sidebar',
  components: { Logo, SidebarItem },
  setup() {
    const settingsStore = useSettingsStore()
    const appStore = useAppStore()
    const permissionStore = usePermissionStore()

    const showLogo = computed(() => settingsStore.sidebarLogo)
    const isCollapse = computed(() => !appStore.sidebar.opened)
    const permission_routes = computed(() => permissionStore.routes)

    const { currentRoute, push } = useRouter()
    const activeMenu = computed(() => {
      const { meta, path } = currentRoute.value
      if (meta.activeMenu) {
        return meta.activeMenu as string
      }
      return path
    })
    watch(
      () => activeMenu,
      (val) => {
        console.log(val)
      }
    )

    // 菜单激活回调 https://element-plus.gitee.io/zh-CN/component/menu.html#menu-%E6%96%B9%E6%B3%95
    const selectMenu = (path: string) => {
      if (currentRoute.value.fullPath === path) {
        return
      }
      if (isExternal(path)) {
        window.open(path)
      } else {
        push(path)
      }
    }
    return {
      showLogo,
      isCollapse,
      permission_routes,
      activeMenu,
      selectMenu
    }
  }
})
</script>

<style lang="less">
.sidebar-item {
  width: var(--menu-width);
  height: var(--navbar-height);
}
</style>
