/*
 * @Description:
 * @Author: Levine
 * @Date: 2023-03-14 16:56:52
 * @LastEditors: Levine
 * @LastEditTime: 2023-04-04 15:08:51
 * @FilePath: /chatgpt-web/src/store/modules/auth/helper.ts
 */
import { getLocal, setLocal } from '@/utils/storage'

const LOCAL_NAME = 'aiyaaa_auth_info'

export interface AuthInfo {
  access_token: string
  expire_in: string
  token_type: string
  user: any
}

export interface AuthState {
  authInfo?: AuthInfo
}

export async function getLocalState(): AuthState {
  const localSetting: AuthInfo | undefined | null = await getLocal(LOCAL_NAME)
  // console.log(localSetting);
  
  return { authInfo: localSetting }
}

export function setLocalState(setting: AuthState): void {
  setLocal(LOCAL_NAME, setting)
}
