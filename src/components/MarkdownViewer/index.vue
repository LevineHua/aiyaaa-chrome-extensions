
<script setup lang="ts">
  import {
    ref, onMounted, getCurrentInstance, watch,
  } from 'vue';
  import * as bytemd from 'bytemd';
  import 'bytemd/dist/index.min.css';
  import 'juejin-markdown-themes/dist/juejin.min.css';
  import zhHans from 'bytemd/lib/locales/zh_Hans.json';
  import breaks from '@bytemd/plugin-breaks';
  import highlight from '@bytemd/plugin-highlight';
  import footnotes from '@bytemd/plugin-footnotes';
  import frontmatter from '@bytemd/plugin-frontmatter';
  import gfm from '@bytemd/plugin-gfm';
  import mediumZoom from '@bytemd/plugin-medium-zoom';
  import gemoji from '@bytemd/plugin-gemoji';

  interface Props {
    value?: string,
    plugins?: any,
    locale?: any,
  }

  const props = withDefaults(defineProps<Props>(), {
    value: '',
    locale: zhHans,
    plugins: [
      breaks(),
      highlight(),
      footnotes(),
      frontmatter(),
      gfm(),
      mediumZoom(),
      gemoji(),
    ],
  });

  const viewer = ref<bytemd.Editor>(null);
  const instance = getCurrentInstance();

  onMounted(() => {
    viewer.value = new bytemd.Viewer({
      target: instance?.subTree.el,
      props,
    });
  });

  watch(props, (newValue) => {
    viewer.value.$set(Object.fromEntries(Object.entries(newValue)
      .filter((v) => v)));
  });
</script>

<template>
  <div />
</template>

<style lang="scss" scoped>
</style>

