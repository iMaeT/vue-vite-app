<template>
  <div class="app-wrapper">
    layout
    <component :is="layout" />
  </div>
</template>

<script setup lang="ts" name="Layout">
import { computed } from 'vue'
import Classic from './modules/Classic.vue'

const layout = computed(() => Classic)
</script>
