import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
        document: 'src/document/index.html'
      },
      // output: {
      //   entryFileNames: '[name]/index.[hash].js',
      //   chunkFileNames: '[name]/[hash].js',
      //   assetFileNames: '[name]/[hash][extname]',
      //   document: {
      //     dir: 'AIyaaa一下/document',
      //     entryFileNames: 'index.[hash].js',
      //     chunkFileNames: '[name].[hash].js',
      //     assetFileNames: '[name].[hash][extname]'
      //   }
      // }
    }
  }
})
