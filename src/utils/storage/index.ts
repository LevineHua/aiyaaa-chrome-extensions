/* global chrome */
import { isObject, isArray } from '@/utils/is'
export function getLocal(key: string) {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (res: any) => {
      console.log(res);
      
      resolve(res[key] ? JSON.parse(res[key]) : res[key])
    })
  })
}

export function setLocal(key: string, value: any) {
  // console.log(key, value);
  
  chrome.storage.local.set({ [key]: isObject(value) || isArray(value) ? JSON.stringify(value) : value }, (res) => {
  })
}