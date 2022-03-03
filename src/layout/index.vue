<template>
  <div :class="classObj" class="app-wrapper">
    <component :is="layout" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useAppStore } from '@/store/modules/app'

import Classic from './modules/Classic.vue'

export default defineComponent({
  name: 'Layout',
  components: { Classic },
  setup() {
    const layout = computed(() => Classic)
    const appStore = useAppStore()
    const classObj = computed(() => {
      return {
        hideSidebar: !appStore.sidebar.opened,
        openSidebar: appStore.sidebar.opened,
        withoutAnimation: appStore.withoutAnimation,
        mobile: appStore.device === 'mobile'
      }
    })
    return {
      layout,
      classObj
    }
  }
})
</script>

<style lang="less" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
