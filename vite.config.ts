import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'
// https://vitejs.dev/config/
export default ({ command, mode }) => {
  //获取各个环境下的对应的变量

  let env = loadEnv(mode, process.cwd());

  return {
    base: '/',
    //代理跨域
    server: {
      open: true,
      host: 'localhost',
      port: 5173,
      proxy: {
        '/api': {
          //获取数据的服务器地址的设置
          target: 'http://sph-api.atguigu.cn',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },

      }
    },
    css: {
      /* CSS 预处理器 */
      preprocessorOptions: {
        scss: {
          additionalData: '@import "src/styles/variable.scss";',
        }

      }
    },
    //配置src别名
    resolve: {
      alias: {
        "@": path.resolve("./src")
      }
    },
    plugins: [
      vue(),
      // 配置自动导入elmentPlus的插件
      // AutoImport({
      //   resolvers: [ElementPlusResolver()],
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()],
      // }),
      //配置mock插件
      viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: command === 'serve',
      }),
    ],
  }
}
