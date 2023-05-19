
<script setup lang="ts">
  /* global chrome */
  import { computed, ref } from 'vue'
  import { useAuthStore } from '@/store'

  const { VITE_APP_DOMAIN_URL } = import.meta.env

  const showMenu = ref(false)

  const authStore = useAuthStore()

  console.log(authStore);
  
  const getAuthInfo = computed(() => {
    console.log(authStore.authInfo);
    
    return authStore.authInfo || {}
  })

  const isExpired = computed(() => {
    return authStore.isExpired
  })

  const getMenuStyle = computed(() => {
    return {
      display: showMenu.value ? 'block' : 'none'
    }
  })

  function login() {
    // chrome.storage.sync.set({ aiyaaaIsLogging: true }, () => {
    //   chrome.tabs.create({
    //     url: VITE_APP_DOMAIN_URL + '/login'
    //   })
    // })

    const url = VITE_APP_DOMAIN_URL + '/login'

    chrome.windows.create({
      url: url,
      type: 'popup',
      width: 500,
      height: 500,
      left: Math.round((screen.width - 500) / 2),
      top: Math.round((screen.height - 500) / 2),
    }, (window) => {
      // 记录登录窗口的ID
      chrome.storage.local.set({ aiyaaaLoginWindowId: window.id }, () => {
        console.log('aiyaaaLoginWindowId设置成功：'+window.id);
        // console.log(window);
        chrome.storage.sync.set({ aiyaaaIsLogging: true })
        chrome.tabs.query({windowId: window.id}, function(tabs) {
          // 遍历所有标签页
          for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            // 如果标签页的 URL 包含您想要匹配的字符串
            if (tab.pendingUrl.indexOf(url) !== -1) {
                // 向标签页注入 JavaScript 代码
                chrome.scripting.executeScript({target: { tabId: tab.id }, files: ['inject/index.js']});
              
            }
          }
        });
      })
    })
  }

  function openPage(path: string) {
    chrome.tabs.create({
      url: VITE_APP_DOMAIN_URL + path
    })
  }

  function openOptions() {
    chrome.runtime.openOptionsPage();
  }

  function logout() {
    authStore.resetAuthInfo()
    showMenu.value = false
    chrome.storage.sync.set({ aiyaaaIsLogging: false })
  }
  
</script>

<template>
  <div class="header">
    <div class="header-body cb-flex cb-row-right">
      <div class="name" @click="login" v-if="isExpired">登录</div>
      <div class="avatar cb-flex" v-else @mouseover="showMenu = true" @mouseout="showMenu = false">
        <img :src="getAuthInfo.user?.avatar || 'https://cdn.cblink.net/aiyaaa/ai-yaaa-logo.png'" @click="openPage('/user')" />
      </div>
      
      <div class="header-menu" :style="getMenuStyle" @mouseover="showMenu = true" @mouseout="showMenu = false">
        <div class="menu-item" @click="openPage('/user')">个人中心</div>
        <div class="menu-item" @click="openOptions">使用文档</div>
        <div class="menu-item" @click="logout">退出登录</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  .header-body {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    padding: 0 20px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
    }
    .name {
      padding-left: 10px;
      cursor: pointer;
      padding: 2px 8px;
      color: var(--color-background);
      background: var(--color-text);
      border-radius: 5px;
      font-size: 13px;
    }
    .avatar {
      cursor: pointer;
      padding: 10px 0;
    }
    .header-menu {
      background: #fff;
      border-radius: 10px;
      width: 84px;
      padding: 8px 0;
      position: fixed;
      right: 20px;
      top: 55px;
      display: none;
      box-shadow: 0 2px 10px 0 rgba(0,0,0,.15);
      .menu-item {
        color: #333;
        padding: 3px 16px;
        font-size: 13px;
        cursor: pointer;
        &:hover {
          color: #2563eb;
        }
      }
    }
  }
}
</style>

