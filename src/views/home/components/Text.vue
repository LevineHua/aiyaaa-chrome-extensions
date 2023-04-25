<!--
 * @Description:
 * @Author: Levine
 * @Date: 2023-03-16 15:00:04
 * @LastEditors: Levine
 * @LastEditTime: 2023-04-04 15:49:19
 * @FilePath: /chatgpt-web/src/views/chat/components/Message/Text.vue
-->
<script lang="ts" setup>
import { computed, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import mdKatex from '@traptitech/markdown-it-katex'
import hljs from 'highlight.js'

interface Props {
  inversion?: boolean
  error?: boolean
  text?: string
  loading?: boolean
  message?: any
}

const props = defineProps<Props>()

const textRef = ref<HTMLElement>()

const mdi = new MarkdownIt({
  linkify: true,
  html: true,
  breaks: true,
  typographer: true,
  highlight(code: any, language: any) {
    const validLang = !!(language && hljs.getLanguage(language))
    if (validLang) {
      const lang = language ?? ''
      return highlightBlock(hljs.highlight(lang, code, true).value, lang)
    }
    return highlightBlock(hljs.highlightAuto(code).value, '')
  },
})

mdi.use(mdKatex, { blockClass: 'katexmath-block rounded-md p-[10px]', errorColor: ' #cc0000' })

const wrapClass = computed(() => {
  return [
    'text-wrap',
    'min-w-[20px]',
    'rounded-md',
    'p-3',
    props.inversion ? 'bg-[#000]' : 'bg-[#f4f6f8]',
    props.inversion ? 'dark:bg-[#a1dc95]' : 'dark:bg-[#1e1e20]',
    { 'text-red-500': props.error },
  ]
})

const text = computed(() => {
  const { err_code } = props.message || {}
  let value = props.text ?? ''
  if (value === '可用额度不足')
    value += '<div class="cb-flex cursor-pointer message-recharge"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="mr-1" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m23.055 14.211l6.942-6.942c2.679-2.678 7.539-2.162 10.217.517s3.195 7.538.517 10.217L30.448 28.286c-2.679 2.678-7.538 2.162-10.217-.517"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m24.945 33.788l-6.942 6.943c-2.679 2.678-7.539 2.162-10.217-.517s-3.195-7.538-.517-10.217l10.283-10.283c2.679-2.678 7.538-2.162 10.217.517"/></svg>去充值</div>'

  // switch (err_code) {
  //   case 10201:
  //     value = '<div class="text-black">很抱歉，您的问题涉及敏感信息，不被允许回答，请重新提交。请您提问时谨慎提交问答内容，<b>若多次触发敏感信息平台将会对您账号进行冻结哦！</b></div><div class="text-black">更多规则内容关注aiyaaa公众号了解。</div><img src="https://cdn.cblink.net/aiyaaa/appeal-bg.png" class="mt-2" style="width: 260px" />'
  //     break

  //   case 10203:
  //     value = '<div class="text-black">很抱歉，您的问题涉及敏感信息，不被允许回答。</div>因本次回答涉及敏感信息，故您的账号已被冻结。若需解除请提交申诉理由，自提交之日起平台将于5个工作日内审核，符合要求将会解封您的账号。<div class="flex items-center text-black cursor-pointer message-appeal mt-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="mr-1" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m23.055 14.211l6.942-6.942c2.679-2.678 7.539-2.162 10.217.517s3.195 7.538.517 10.217L30.448 28.286c-2.679 2.678-7.538 2.162-10.217-.517"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m24.945 33.788l-6.942 6.943c-2.679 2.678-7.539 2.162-10.217-.517s-3.195-7.538-.517-10.217l10.283-10.283c2.679-2.678 7.538-2.162 10.217.517"/></svg><点击申诉解除账号></div><div class="text-black mt-2">关注AIyaaa公众号跟进申诉进度</div><img src="https://cdn.cblink.net/aiyaaa/appeal-bg.png" class="mt-2" style="width: 260px" />'
  //     break

  //   default:
  //     break
  // }

  if (!props.inversion)
    return mdi.render(value)
  return value
})

function highlightBlock(str: string, lang?: string) {
  return `<pre class="code-block-wrapper"><div class="code-block-header cb-flex"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy cb-flex">复制代码<svg class="ml-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M216 34H88a6 6 0 0 0-6 6v42H40a6 6 0 0 0-6 6v128a6 6 0 0 0 6 6h128a6 6 0 0 0 6-6v-42h42a6 6 0 0 0 6-6V40a6 6 0 0 0-6-6Zm-54 176H46V94h116Zm48-48h-36V88a6 6 0 0 0-6-6H94V46h116Z"/></svg></span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`
}

defineExpose({ textRef })
</script>

<template>
  <div class="text-black relative" :class="wrapClass">
    <template v-if="loading">
      <div class="text-loading">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </template>
    <template v-else>
      <div ref="textRef" class="leading-relaxed break-words" style="color: #fff;">
        <div
          v-if="!inversion" class="markdown-body" :class="{ 'text-red-500': props.error }" v-html="text"
        />
        <div v-else class="whitespace-pre-wrap" v-text="text" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
