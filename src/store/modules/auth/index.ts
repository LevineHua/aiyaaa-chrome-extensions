/*
 * @Description:
 * @Author: Levine
 * @Date: 2023-03-14 16:55:44
 * @LastEditors: Levine
 * @LastEditTime: 2023-04-04 18:04:13
 * @FilePath: /chatgpt-web/src/store/modules/auth/index.ts
 */
import { defineStore } from 'pinia'
import type { AuthState } from './helper'
import { getLocalState, setLocalState } from './helper'

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => null,
  getters: {
    // token是否过期
    isExpired() {
      const { expire_in } = this.authInfo || {}
      if (!expire_in) {
        return true
      } else if (expire_in && (new Date().getTime() >= expire_in)) {
        return true
      } else {
        return false
      }
    }
  },
  actions: {
    async getAuthInfo() {
      const { authInfo } = await getLocalState()
      console.log(authInfo, '---');
      this.authInfo = authInfo
    },

    updateAuthInfo(authInfo: Partial<AuthInfo>) {
      this.authInfo = { ...this.authInfo, ...authInfo }

      this.recordState()
    },

    resetAuthInfo() {
      this.authInfo = null
      this.recordState()
    },

    recordState() {
      setLocalState(this.authInfo)
    },
  },
})
