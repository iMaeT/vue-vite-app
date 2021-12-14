<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">Logo</div>
</template>

<script setup lang="ts" name="Logo">
import { PropType } from 'vue'

defineProps({
  collapse: {
    type: Boolean as PropType<boolean>,
    required: true
  }
})
</script>
