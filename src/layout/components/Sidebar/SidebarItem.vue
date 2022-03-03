<template>
  <template v-if="!item.meta.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.meta.alwaysShow
      "
    >
      <el-menu-item
        :index="resolvePath(onlyOneChild.path)"
        :class="{ 'submenu-title-noDropdown': !isNest }"
      >
        <item
          :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
          :title="onlyOneChild.meta.title"
        />
      </el-menu-item>
    </template>
    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <item v-if="item.meta && item.meta.title" :icon="item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import path from 'path-browserify'
import type { AppRouteRecordRaw } from '@/router/types'

import Item from './Item.vue'
import { isExternal } from '@/utils/validate'

export default defineComponent({
  name: 'SidebarItem',
  components: { Item },
  props: {
    // route Object
    item: {
      type: Object as PropType<AppRouteRecordRaw>,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const onlyOneChild = ref<any>(null)

    const hasOneShowingChild = (
      children: AppRouteRecordRaw[] = [],
      parent: AppRouteRecordRaw
    ): boolean => {
      const showingChildren: AppRouteRecordRaw[] = children.filter((child: AppRouteRecordRaw) => {
        if (child.meta && child.meta.hidden) {
          return false
        } else {
          onlyOneChild.value = child
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    }

    const resolvePath = (routePath: string): string => {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(props.basePath)) {
        return props.basePath
      }
      return path.resolve(props.basePath, routePath)
    }

    return {
      hasOneShowingChild,
      onlyOneChild,
      resolvePath
    }
  }
})
</script>
