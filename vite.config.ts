import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // // 复制 docs 打包文件到 dist 目录下
    // process.env.NODE_ENV === 'production' ? copy({
    //   targets:[{
    //     src: 'src/document/docs/.vitepress/dist/*',
    //     dest: 'AIyaaa一下/docs'
    //   }],
    //   hook: 'writeBundle'
    // }) : void 0,
    // // 打包完成后删除 docs 打包文件
    // process.env.NODE_ENV === 'production' ? {
    //   closeBundle: () => {
    //     rimrafSync('src/document/docs/.vitepress/dist')
    //   }
    // } : void 0,
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'AIyaaa一下',
    rollupOptions: {
      input: {
        main: 'index.html',
        document: 'document.html'
      },
    },
  }
})
