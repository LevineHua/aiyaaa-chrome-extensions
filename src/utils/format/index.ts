/*
 * @Description:
 * @Author: Levine
 * @Date: 2023-03-17 15:39:13
 * @LastEditors: Levine
 * @LastEditTime: 2023-03-30 17:46:22
 * @FilePath: /chatgpt-web/src/utils/format/index.ts
 */
import toast from '@/components/Toast'

/**
 * 转义 HTML 字符
 * @param source
 */
export function encodeHTML(source: string) {
  return source
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * 判断是否为代码块
 * @param text
 */
export function includeCode(text: string | null | undefined) {
  const regexp = /^(?:\s{4}|\t).+/gm
  return !!(text?.includes(' = ') || text?.match(regexp))
}

/**
 * 复制文本
 * @param options
 */
export function copyText(options: { text: string; origin?: boolean; dom?: HTMLElement }) {
  const props = { origin: true, ...options }

  let input: HTMLInputElement | HTMLTextAreaElement

  if (props.origin)
    input = document.createElement('textarea')
  else
    input = document.createElement('input')

  input.setAttribute('readonly', 'readonly')
  input.value = props.text
  if (props.dom)
    props.dom.appendChild(input)

  else
    document.body.appendChild(input)

  input.select()
  if (document.execCommand('copy'))
    document.execCommand('copy')

  if (props.dom)
    props.dom.removeChild(input)

  else
    document.body.removeChild(input)

  toast({message: '复制成功'})
}
