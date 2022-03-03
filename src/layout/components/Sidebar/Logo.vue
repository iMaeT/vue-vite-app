<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>
      <router-link v-else class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts" name="Logo">
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'Logo',
  props: {
    collapse: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },
  setup() {
    const logo = ref<string>('https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png')
    const title = ref<string>('Vue3 Element Admin')

    return {
      logo,
      title
    }
  }
})
</script>

<style lang="less" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  width: 100%;
  height: var(--logo-side-height);
  background-color: var(--menu-background-color);

  .sidebar-logo-link {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;

    .sidebar-logo {
      width: 37px;
      height: 37px;
      margin-left: 12px;
    }

    .sidebar-title {
      margin-left: 12px;
      font-size: 14px;
      font-weight: 400;
      color: var(--menu-active-text-color);
    }
  }
}
</style>
