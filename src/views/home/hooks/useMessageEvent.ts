/*
 * @Description:
 * @Author: Levine
 * @Date: 2023-03-07 14:11:07
 * @LastEditors: Levine
 * @LastEditTime: 2023-04-04 15:46:53
 * @FilePath: /chatgpt-web/src/views/chat/hooks/useMessageEvent.ts
 */
import { onMounted, onUpdated } from 'vue'

const { VITE_APP_DOMAIN_URL } = import.meta.env

export function useMessageEvent() {
  // 续费
  function recharge() {
    const btns = document.querySelectorAll('.message-recharge')
    btns.forEach((btn) => {
      if (btn) {
        btn.addEventListener('click', () => {
          chrome.tabs.create({
            url: VITE_APP_DOMAIN_URL + '/user'
          })
        })
      }
    })
  }

  onMounted(() => {
    recharge()
  })

  onUpdated(() => {
    recharge()
  })
}
