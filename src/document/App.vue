<!--
 * @Description:
 * @Author: Levine
 * @Date: 2023-03-07 14:11:07
 * @LastEditors: Levine
 * @LastEditTime: 2023-03-28 16:12:59
 * @FilePath: /chatgpt-web/src/App.vue
-->
<script setup lang="ts">
// import { computed } from 'vue'
import Document from './makdown/index.md?raw'
// import MarkdownIt from 'markdown-it'
import MarkdownViewer from '../components/MarkdownViewer/index.vue'

// const mdi = new MarkdownIt({
//   // linkify: true,
//   // html: true,
//   // breaks: true,
//   // typographer: true,
// })

// const text = computed(() => {
//   return mdi.render(Document)
// })
</script>

<template>
  <div>
    <div class="document">
      <MarkdownViewer :value="Document"></MarkdownViewer>
    </div>
    
  </div>
</template>

<style lang="scss" scoped>
.document {
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 0;
}
</style>

