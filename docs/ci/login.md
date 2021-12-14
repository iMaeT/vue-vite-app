# tsx 支持

安装官方维护的vite插件@vitejs/plugin-vue-jsx

``` bash

$ npm install @vitejs/plugin-vue-jsx -D
# or
$ yarn add @vitejs/plugin-vue-jsx -D

```

[vue jsx语法规范](https://github.com/vuejs/jsx-next)

## vite.config.ts 进行插件使用

``` typescript
import type { UserConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default (): UserConfig => {
  return {
    plugins: [
      vueJsx()
    ]
  }
}
```
