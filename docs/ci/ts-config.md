# @types

## shims-vue.d.ts 相关

[客户端类型](https://cn.vitejs.dev/guide/features.html#client-types)

``` typescript
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
```
