<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/store'
import { onMounted } from 'vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.getAuthInfo()
})

chrome.runtime.onMessage.addListener((req) => {
  const { backgroundMessage } = req
  if (backgroundMessage === 'upload') {
    authStore.getAuthInfo()
    alert('登录成功')
  }
})

</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
