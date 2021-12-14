<template>
  <router-view class="app" />
</template>

<script setup lang="ts" name="App"></script>
<style lang="less">
.size {
  width: 100%;
  height: 100%;
  min-width: var(--content-min-width);
}

html,
body {
  .size;

  padding: 0;
  margin: 0;
}

#app {
  .size;

  background: var(--app-background-color);
}
</style>
