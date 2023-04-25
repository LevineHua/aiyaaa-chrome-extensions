/*
 * @Description:
 * @Author: Levine
 * @Date: 2023-03-07 14:11:07
 * @LastEditors: Levine
 * @LastEditTime: 2023-03-24 10:32:47
 * @FilePath: /chatgpt-web/src/api/index.ts
 */
import type { AxiosProgressEvent } from 'axios'
import { post } from '@/utils/request'

export function fetchChatAPIProcess<T = any>(
  params: {
    prompt: string
    last_id?: any
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void },
) {
  return post<T>({
    url: '/openai/chat-process',
    data: { message: params.prompt, last_id: params.last_id },
    onDownloadProgress: params.onDownloadProgress,
  })
}
