/* global chrome */
import { unref } from 'vue'
import { useFilterTag } from './useFilterTag'

// 指令
export function useCommand(enableFilterTags: string[], enableFilterKeywords: string[], enableTags: string[]) {
  const { recordSite } = useFilterTag()

  // 给搜索内容附加内容
  async function additionalPrompt(prompt: string) {
    // 检查用户输入是否符合要求
    if (/(分析|抓取|获取|根据|总结|提取|汇总|模仿).*(当前|页面|网页|网站|这篇|这个|写).*(文章|数据|内容|网页|网站|商品|表格|页面|文章)/.test(prompt)) {
      // 执行触发A指令的逻辑
      prompt += await grabCurrentTabHtml()
    }
    return prompt
  }

  // 删除指定标签及包含某些类名或ID的标签和子标签
  function handleRemoveTag(box: any, removeTag: string) {
    const elementToRemoves = box.querySelectorAll(removeTag)
    for (let i = 0; i < elementToRemoves.length; i++) {
      const el = elementToRemoves[i];
      el.parentNode.removeChild(el);
    }
  }

  // 抓取当前网页内容
  function grabCurrentTabHtml() {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
        const currentTab = tabs[0];

        // 记录当前标签URL
        recordSite()
  
        chrome.scripting.executeScript(
          {
            target: { tabId: currentTab.id },
            function: () => {
              return document.body.outerHTML
            }
          },
          (result: any) => {
            
            const htmlContent = result[0].result || '';

            console.log('htmlContent', htmlContent);
            
            // const needRemoveTag = [
            //   'footer', 'header', '.menu', '.head', '.aside', '.sidebar',
            //   '.content_right', '.result-molecule', '.mask', '.popup-box', '#head', '#content_right', '#menu', "#aging-total-page", '#result_tts_player',
            //   '#shop-container-header', '#shop-container-footer', '.price-info-module', '.od-pc-offer-recommend', '.od-pc-content-statement',
            //   '#shop-head', '#shortcut-2014', '#crumb-wrap', '#guarantee', '#GLOBAL_FOOTER', '#J-global-toolbar',
            //   '.wshead', '.topall', '.nsall', '.win-news-right', '.hdear', '.win-jg', '.win-news-links', '.win-news-push', '.win-new-list1', '.win-footer', '.win-login-layer',
            //   '.right-bar',
            //   '.main-header-box', '.article-suspended-panel', '.category-course-recommend', '.extension-banner', '.recommended-area'
            // ]

            const needRemoveTag = unref(enableFilterTags)

            // 删除指定标签及包含某些类名或ID的标签和子标签
            const box = document.createElement('div')
            box.innerHTML = htmlContent

            // 截取出需要的内容
            const tags = unref(enableTags) || []
            if (tags.length) {
              const newBox = document.createElement('div')
              let newHtmlContent = ''
              for (let index = 0; index < tags.length; index++) {
                const html = box.querySelector(tags[index])?.outerHTML || ''
                newHtmlContent = newHtmlContent + html
              }
              newBox.innerHTML = newHtmlContent

              box.innerHTML = newHtmlContent || htmlContent
            }

            // 移除需要过滤的
            for (let i = 0; i < needRemoveTag.length; i++) {
              const tag = needRemoveTag[i];
              handleRemoveTag(box, tag)
            }

            console.log(box);
            
            const newContent = box.innerHTML
              .replace(/<(style|script)[^>]*>[\s\S]*?<\/\1>/gi, '')
              .replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '')
              .replace(/<style([\s\S]*?)<\/style>/gi, '')
              .replace(/<script([\s\S]*?)<\/script>/gi, '')
              .replace(/<\/div>/ig, '\n')
              .replace(/<\/li>/ig, '\n')
              .replace(/<li>/ig, '  *  ')
              .replace(/<\/ul>/ig, '\n')
              .replace(/<\/p>/ig, '\n')
              .replace(/<br\s*[\/]?>/gi, "\n")
              .replace(/(<([^>]+)>)/ig,"")
              .replace(/^\s*[\r\n]/gm, '');
            console.log(newContent);

            // 过滤某些敏感词
            console.log(enableFilterKeywords);
            
            const regex = new RegExp(unref(enableFilterKeywords).join('|'), 'gi');
            const finishResult = newContent.replace(regex, '');

            resolve('。使用中文。网页内容为：' + finishResult)
          }
        );
      })
    })
  }
  return {
    additionalPrompt
  }
}