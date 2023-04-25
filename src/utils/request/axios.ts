/*
 * @Description:
 * @Author: Levine
 * @Date: 2023-03-07 14:11:07
 * @LastEditors: Levine
 * @LastEditTime: 2023-04-04 16:33:17
 * @FilePath: /chatgpt-web/src/utils/request/axios.ts
 */
import axios, { type AxiosResponse } from 'axios'
import { isString } from '../is'
import { useAuthStore } from '@/store'
import router from '@/router'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
})

service.interceptors.request.use(
  (config) => {
    const { authInfo } = useAuthStore()

    config.headers.Authorization = `${authInfo?.token_type} ${authInfo?.access_token}`
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse): any => {
    if (response.status === 200) {
      // console.log(response)
      // 如果 response.data 为字符串类型，则默认视为聊天返回的内容
      if (isString(response.data))
        return response.data

      const { err_code, err_msg, data } = response.data
      if (err_code) {

        switch (err_code) {
          case 401:
            response.data.err_msg = '未授权的登录，请先登录'
            break
        }
        return Promise.reject(response.data)
      }
      else {
        return data
      }
    }

    // throw new Error(response.status.toString())
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default service
