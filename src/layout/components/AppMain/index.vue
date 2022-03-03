<template>
  <!-- https://router.vuejs.org/zh/guide/migration/index.html#router-view-%E3%80%81-keep-alive-%E5%92%8C-transition -->
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in" appear>
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppMain',
  setup() {}
})
</script>
