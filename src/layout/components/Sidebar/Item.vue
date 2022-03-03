<template>
  <i v-if="icon && icon.includes('el-icon')" :class="[icon, 'sub-el-icon']"></i>
  <svg-icon v-else-if="icon" :icon-class="icon" />
  <slot name="title">
    <span class="anticon-item">{{ title }}</span>
  </slot>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'MenuItem',
  props: {
    icon: {
      type: String as PropType<string>,
      default: ''
    },
    title: {
      type: String as PropType<string>,
      default: ''
    }
  }
})
</script>

<style lang="less" scoped>
.sub-el-icon {
  width: 1em;
  height: 1em;
  color: currentColor;
}

.anticon-item {
  opacity: 1;
  transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
