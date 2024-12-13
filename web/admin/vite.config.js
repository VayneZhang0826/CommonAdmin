import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 9001,
    host: '0.0.0.0',
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  mode: 'development',
  css: {
    preprocessorOptions: {
      less: {
        // 全局变量 在每个 Less 文件编译之前，自动将 variables.less 文件导入进来
        additionalData: `@import "@/assets/styles/variables.less";`,
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
        },
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    // 引入文件时，可以省略文件后缀
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    // 默认导入目录下index.[js|jsx|ts|tsx|vue]
    mainFiles: ['index'],
  },
})
