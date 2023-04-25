/* global chrome */
console.log('inject ====');
var aiyaaa_extensions_login_timer = null

// 循环获取鉴权信息
function loopGetAuth() {
  localStorage.setItem('shareOpenId', JSON.stringify({"data":"pju30J3gnz4T8H7M","expire":null}))
  
  aiyaaa_extensions_login_timer = setInterval(() => {
    const authStorage = localStorage.getItem('authStorage')
    let auth = {}
    // console.log('读取中...');
    if (authStorage) {
      auth = JSON.parse(authStorage).data
      // 判断是否拿到用户鉴权信息
      if (auth.authInfo) {
        // 判断鉴权是否过期，如果已过期则不使用
        const { expire_in } = auth.authInfo
        console.log(expire_in);
        if (new Date().getTime() >= expire_in) {
          return
        }
        // console.log(auth);
        stop()
        // 将鉴权信息发送给插件，并让插件存在storage中
        chrome.runtime.sendMessage({
          authInfo: auth.authInfo
        }, res => {
          console.log(res);
          // alert('登录成功，请重新打开插件')
        })
      }
    }
  }, 100)
}

// 终止循环
function stop() {
  if (aiyaaa_extensions_login_timer) {
    clearInterval(aiyaaa_extensions_login_timer)
    aiyaaa_extensions_login_timer = null
  }
}

chrome.storage.sync.get('aiyaaaIsLogging', (data) => {
  const { aiyaaaIsLogging } = data
  if (aiyaaaIsLogging) {
    loopGetAuth()
  }
})

