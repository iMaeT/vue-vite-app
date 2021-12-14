<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu>
        <div class="sidebar-item">sidebarItem</div>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts" name="Sidebar">
import { computed } from 'vue'
import { useSettingsStore } from '@/store/modules/settings'
import { useAppStore } from '@/store/modules/app'

import Logo from './Logo.vue'
import variables from '@/styles/var.module.less'
console.log(variables)

const settingsStore = useSettingsStore()
const appStore = useAppStore()

const showLogo = computed(() => settingsStore.sidebarLogo)
const isCollapse = computed(() => appStore.sidebar.opened)
</script>

<style lang="less">
.sidebar-item {
  width: var(--menu-width);
  height: var(--navbar-height);
}
</style>
