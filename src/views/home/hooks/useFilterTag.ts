import request from '@/utils/request/axios'
import { onMounted, reactive, toRefs } from 'vue'

export function useFilterTag() {

  const state = reactive({
    // 需要过滤的标签
    enableFilterTags: [],
    // 需要过滤的关键字
    enableFilterKeywords: [],
    // 需要读取dom的字段，如果数组不为空，则读取数组内的标签，而不是全部 dom
    enableTags: []
  })

  // 获取当前选中标签页url
  function getSiteUrl() {
    return new Promise(resolve => {
      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs: any) => {
        const url = new URL(tabs[0].url);
        const hostname = url.hostname;
        resolve(hostname)
      });
    })
  }
  
  // 获取需要过滤掉的标签
  async function getSiteTags() {
    try {
      const hostname = await getSiteUrl()

      const data: any = await request.get(
        'https://fc-mp-2dea8861-5886-42ec-bfa1-5e27ca297380.next.bspapp.com/site',
        {
          params: {
            hostname
          }
        }
      )
      
      state.enableFilterTags = data.reduce((prev: any, curr: any) => [...prev, ...curr.tags], [])
      state.enableFilterKeywords = data.reduce((prev: any, curr: any) => [...prev, ...(curr.filterKeywords || [])], [])
      state.enableTags = data.reduce((prev: any, curr: any) => [...prev, ...(curr.enableTags || [])], [])
    } catch (error) {}
  }

  // 记录当前网址
  async function recordSite() {
    try {
      const hostname = await getSiteUrl()

      request.post(
        'https://fc-mp-2dea8861-5886-42ec-bfa1-5e27ca297380.next.bspapp.com/addSite',
        {
          hostname
        }
      )
      
    } catch (error) {
      
    }
  }

  return {
    getSiteTags,
    recordSite,
    ...toRefs(state)
  }
}