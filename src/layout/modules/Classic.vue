<template>
  <div class="app__wrap">
    <!-- Classic -->
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <AppMain />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Sidebar, AppMain } from '../components'

export default defineComponent({
  name: 'Classic',
  components: { Sidebar, AppMain },
  setup() {}
})
</script>

<style lang="less" scoped>
.app__wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
