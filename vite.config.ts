import { UserConfig, ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import eslintPlugin from 'vite-plugin-eslint'
import ElementPlus from 'unplugin-element-plus/vite'
import viteSvgIcon from 'vite-plugin-svg-icons'
import commonjsExternals from 'vite-plugin-commonjs-externals'

const root = process.cwd()

function pathResolve(dir: string) {
  return resolve(root, '.', dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  let env = null
  if (command === 'serve') {
    env = loadEnv(process.argv[3], root)
  } else {
    env = loadEnv(mode, root)
  }
  const proxyPath: string = env.VITE_API_BASEPATH
  // 转为正则表达式
  const regExpPath = new RegExp(`^${proxyPath}`)
  return {
    base: env.VITE_BASE_PATH,
    plugins: [
      vue(),
      vueJsx(),
      vueSetupExtend(),
      ElementPlus({
        useSource: true
      }),
      Components({
        dts: true,
        deep: true,
        dirs: ['src/components', 'src/layout'],
        resolvers: [ElementPlusResolver()]
      }),
      eslintPlugin({
        cache: false,
        include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'] // 检查的文件
      }),
      viteSvgIcon({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(root, 'src/assets/icons')],
        // 指定 symbolId 格式
        symbolId: 'icon-[dir]-[name]',
        // 压缩
        svgoOptions: true
      }),
      commonjsExternals({
        externals: ['path']
      })
    ],
    css: {
      // css 模块化
      modules: {
        generateScopedName: '[name]__[local]__[hash:base64:5]',
        hashPrefix: 'prefix'
      },
      // 预编译支持 less
      preprocessorOptions: {
        less: {
          additionalData: '@import "./src/styles/variables.less";',
          javascriptEnabled: true
        }
      }
    },
    resolve: {
      alias: [
        {
          find: /\@\//,
          replacement: pathResolve('src') + '/'
        },
        {
          find: /\_v\//,
          replacement: pathResolve('src/views') + '/'
        },
        {
          find: /\_c\//,
          replacement: pathResolve('src/components') + '/'
        }
      ]
    },
    // build: {
    //   minify: 'terser',
    //   outDir: env.VITE_OUT_DIR,
    //   sourcemap: env.VITE_SOURCEMAP === 'true' ? 'inline' : false,
    //   brotliSize: false,
    //   terserOptions: {
    //     compress: {
    //       drop_debugger: env.VITE_DROP_DEBUGGER === 'true',
    //       drop_console: env.VITE_DROP_CONSOLE === 'true'
    //     }
    //   }
    // },
    server: {
      proxy: {
        // // 字符串简写写法
        // '/foo': 'http://localhost:4567/foo',
        // // 选项写法
        // '/api': {
        //   target: 'http://jsonplaceholder.typicode.com',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, '')
        // },
        // // 正则表达式写法
        // '^/fallback/.*': {
        //   target: 'http://jsonplaceholder.typicode.com',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/fallback/, '')
        // }

        [proxyPath]: {
          target: 'http://172.16.10.182:9000',
          changeOrigin: true,
          rewrite: (path) => {
            return path.replace(regExpPath, '')
          }
        }
      }
    },
    optimizeDeps: {
      include: [
        'element-plus'
      ]
    }
  }
}
