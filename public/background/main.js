/* global chrome */
console.log('backgruond.js');

// 接收消息
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.log('我是background，我接受到了消息：', req)
  const { authInfo } = req
  // 接收鉴权信息
  if (authInfo) {
    // 保存鉴权信息
    chrome.storage.local.set({ aiyaaa_auth_info: JSON.stringify(authInfo) }, () => {
      console.log('添加完成');
      // 给 popup 发送通知：更新视图
      chrome.runtime.sendMessage({ backgroundMessage: 'upload' })
      chrome.storage.sync.set({ aiyaaaIsLogging: false })
      // 关闭登录窗口
      chrome.storage.local.get('aiyaaaLoginWindowId', (data) => {
        const { aiyaaaLoginWindowId } = data
        if (aiyaaaLoginWindowId) {
          chrome.windows.remove(aiyaaaLoginWindowId);
        }
      })
    })
    sendResponse('登录成功')
  }
  
})