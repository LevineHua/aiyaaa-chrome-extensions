<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  message: string
  duration: number
}>()

const show = ref(false)

onMounted(() => {
  setTimeout(() => {
    show.value = true;
    setTimeout(() => {
      show.value = false;
    }, props.duration || 1500);
  }, 100);
})
</script>

<template>
  <div class="toast" v-show="show">{{ message }}</div>
</template>

<style lang="scss" scoped>
.toast {
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 100px;
  padding: 8px 16px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  z-index: 9999;
}
</style>

