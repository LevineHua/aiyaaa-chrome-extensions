<script setup lang="ts">
import { fetchChatAPIProcess } from '@/api'
import { ref, computed, unref, onMounted } from 'vue'
import Text from './components/Text.vue'
import { useScroll } from './hooks/useScroll'
import { useCopyCode } from './hooks/useCopyCode'
import { copyText } from '@/utils/format'
import Header from '@/components/Header/index.vue'
import { useMessageEvent } from './hooks/useMessageEvent'

const { VITE_APP_DOMAIN_URL } = import.meta.env

const prompt = ref<string>('')
const chatMessage = ref<string>('')
const loading = ref(false)
const inputRef = ref(null)
// 是否加载完成
const loaded = ref(false)
// 上条消息的ID
const last_id = ref('')
// 异常状态
const error_code = ref(0)

const { scrollRef, scrollToBottom } = useScroll()
useCopyCode()
useMessageEvent()

function handleEnter(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    inputRef.value && inputRef.value.blur()
    
    handleSubmit()
  }
}

function handleSubmit() {
  onConversation()
}

async function onConversation(content?: any) {
  const message = content || prompt.value

  if (loading.value)
    return

  if (!message || message.trim() === '')
    return
  
  loading.value = true
  loaded.value = false

  try {
    await fetchChatAPIProcess({
      prompt: message,
      last_id: last_id.value,
      onDownloadProgress: ({ event }) => {
        const xhr = event.target
        const { responseText } = xhr
        loading.value = false
        try {
          const responseObjs = JSON.parse(`[${responseText.substring(0, responseText.length - 1)}]`)

          let chunk = ''
          if (responseObjs && responseObjs.length)
            chunk = responseObjs[responseObjs.length - 1]

          const data: any = chunk
          chatMessage.value = data.messages || ''
          last_id.value = data.id
          
          scrollToBottom()
        }
        catch (error) {
          console.log(error)
          return Promise.reject(error)
        }
      },
    })
    loaded.value = true
    error_code.value = 0
  } catch (error) {
    const { err_msg, err_code } = error
    chatMessage.value = err_msg || ''
    error_code.value = err_code
  }
  finally {
    loading.value = false
    loaded.value = true
  }
}

function toAiyaaa() {
  chrome.tabs.create({
    url: VITE_APP_DOMAIN_URL
  })
}

</script>

<template>
  <div class="chat cb-flex cb-flex-col cb-row-center">
    <Header></Header>
    <div class="title" @click="toAiyaaa">AIyaaa</div>
    <div class="search-box cb-flex">
      <input type="text" class="cb-flex-1" ref="inputRef" v-model="prompt" @keypress="handleEnter" />
      <div class="search-btn cb-flex" @click="handleSubmit">AIyaaa一下</div>
    </div>
    <div class="chat-body cb-flex-1" ref="scrollRef">
      <Text :text="chatMessage" :loading="loading"></Text>
      <div class="copy-btn" v-if="chatMessage && loaded && !error_code" @click="copyText({ text: chatMessage })">复制内容</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat {
  padding-bottom: 15px;
  margin: 0 auto;
  height: 100vh;
  overflow: auto;
  // padding-top: 10px;
}
.title {
  // color: #e8eaed;
  color: var(--color-text);
  font-size: 75px;
  text-align: center;
  font-weight: bold;
  font-family: initial;
  margin-bottom: 10px;
  cursor: pointer;
}
.search-box {
  height: 44px;
  border: 1px solid #5f6368;
  border-radius: 24px;
  margin: 0 auto;
  width: 500px;
  font-family: initial;
  margin-bottom: 15px;
  input {
    height: 100%;
    border: none;
    box-shadow: none;
    background: none;
    color: var(--color-text);
    font-size: 16px;
    padding: 0 15px;
    outline: none;
  }
  .search-btn {
    color: var(--color-background);
    background: var(--color-text);
    height: 44px;
    padding: 0 15px;
    border-radius: 0 24px 24px 0;
    cursor: pointer;
    font-size: 17px;
  }
}
.chat-body {
  width: 500px;
  margin: 0 auto;
  color: var(--color-text);
  overflow: auto;
  .copy-btn {
    margin: 0 auto;
    color: var(--color-background);
    background: var(--color-text);
    width: 80px;
    text-align: center;
    padding: 8px 0;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    font-size: 12px;
  }
  .login-iframe {
    width: 100%;
    height: 400px;
  }
}
</style>
