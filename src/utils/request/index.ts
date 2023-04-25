/*
 * @Description:
 * @Author: Levine
 * @Date: 2023-03-07 14:11:07
 * @LastEditors: Levine
 * @LastEditTime: 2023-04-04 15:36:00
 * @FilePath: /chatgpt-web/src/utils/request/index.ts
 */
import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { isString } from '../is'
import request from './axios'

export interface HttpOption {
  url: string
  data?: any
  method?: string
  headers?: any
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
  signal?: GenericAbortSignal
  beforeRequest?: () => void
  afterRequest?: () => void
}

export interface Response<T = any> {
  data: T
  message: string | null
  status: string
}

function http<T = any>(
  { url, data, method, headers, onDownloadProgress, signal, beforeRequest, afterRequest }: HttpOption,
) {
  const successHandler = (res: any) => {
    // console.log(res)

    if (isString(res))
      return res

    // if (res.data.status === 'Success' || typeof res.data === 'string')
    //   return res.data

    // if (res.id)
    //   return res

    return Promise.reject(res)
  }

  const failHandler = (error: any) => {
    console.log(error)

    afterRequest?.()
    return Promise.reject(error?.err_code ? error : '您中断了回答，若继续请刷新重试！')
    // throw new Error(error.err_code ? error : '回答中断，请重试')
  }

  beforeRequest?.()

  method = method || 'GET'

  const params = Object.assign(typeof data === 'function' ? data() : data ?? {}, {})

  return method === 'GET'
    ? request.get(url, { params, signal, onDownloadProgress }).then(successHandler, failHandler)
    : request.post(url, params, { headers, signal, onDownloadProgress }).then(successHandler, failHandler)
}

export function get<T = any>(
  { url, data, method = 'GET', onDownloadProgress, signal, beforeRequest, afterRequest }: HttpOption,
): Promise<any> {
  return http<T>({
    url,
    method,
    data,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest,
  })
}

export function post<T = any>(
  { url, data, method = 'POST', headers, onDownloadProgress, signal, beforeRequest, afterRequest }: HttpOption,
): Promise<any> {
  return http<T>({
    url,
    method,
    data,
    headers,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest,
  })
}

export default post
