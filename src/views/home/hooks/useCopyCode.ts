/*
 * @Description:
 * @Author: Levine
 * @Date: 2023-03-07 14:11:07
 * @LastEditors: Levine
 * @LastEditTime: 2023-03-27 16:39:58
 * @FilePath: /chatgpt-web/src/views/chat/hooks/useCopyCode.ts
 */
import { onMounted, onUpdated } from 'vue'
// import { copyText } from '@/utils/format'
import toast from '@/components/Toast'

export function useCopyCode() {
  function copyCodeBlock() {
    const codeBlockWrapper = document.querySelectorAll('.code-block-wrapper')
    codeBlockWrapper.forEach((wrapper) => {
      const copyBtn = wrapper.querySelector('.code-block-header__copy')
      const codeBlock = wrapper.querySelector('.code-block-body')
      if (copyBtn && codeBlock) {
        copyBtn.addEventListener('click', () => {
          console.log('===')

          if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(codeBlock.textContent ?? '')
            toast({message: '复制成功'})
          }
          // else { copyText({ text: codeBlock.textContent ?? '', origin: true }) }
        })
      }
    })
  }

  onMounted(() => copyCodeBlock())

  onUpdated(() => copyCodeBlock())
}
