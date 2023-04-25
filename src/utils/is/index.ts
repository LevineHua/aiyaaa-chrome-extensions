/*
 * @Description:
 * @Author: Levine
 * @Date: 2023-03-07 14:11:07
 * @LastEditors: Levine
 * @LastEditTime: 2023-03-22 18:17:26
 * @FilePath: /chatgpt-web/src/utils/is/index.ts
 */
export function isNumber<T extends number>(value: T | unknown): value is number {
  return Object.prototype.toString.call(value) === '[object Number]'
}

export function isString<T extends string>(value: T | unknown): value is string {
  return Object.prototype.toString.call(value) === '[object String]'
}

export function isBoolean<T extends boolean>(value: T | unknown): value is boolean {
  return Object.prototype.toString.call(value) === '[object Boolean]'
}

export function isNull<T extends null>(value: T | unknown): value is null {
  return Object.prototype.toString.call(value) === '[object Null]'
}

export function isUndefined<T extends undefined>(value: T | unknown): value is undefined {
  return Object.prototype.toString.call(value) === '[object Undefined]'
}

export function isObject<T extends object>(value: T | unknown): value is object {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function isArray<T extends any[]>(value: T | unknown): value is T {
  return Object.prototype.toString.call(value) === '[object Array]'
}

export function isFunction<T extends (...args: any[]) => any | void | never>(value: T | unknown): value is T {
  return Object.prototype.toString.call(value) === '[object Function]'
}

export function isDate<T extends Date>(value: T | unknown): value is T {
  return Object.prototype.toString.call(value) === '[object Date]'
}

export function isRegExp<T extends RegExp>(value: T | unknown): value is T {
  return Object.prototype.toString.call(value) === '[object RegExp]'
}

export function isPromise<T extends Promise<any>>(value: T | unknown): value is T {
  return Object.prototype.toString.call(value) === '[object Promise]'
}

export function isSet<T extends Set<any>>(value: T | unknown): value is T {
  return Object.prototype.toString.call(value) === '[object Set]'
}

export function isMap<T extends Map<any, any>>(value: T | unknown): value is T {
  return Object.prototype.toString.call(value) === '[object Map]'
}

export function isFile<T extends File>(value: T | unknown): value is T {
  return Object.prototype.toString.call(value) === '[object File]'
}

// 是否为空数据
export function isNullData(val: any) {
  return isArray(val) && !val.length
}

// 是否是微信浏览器
export const isWeixinBrowser = () => {
  const ua = navigator.userAgent.toLowerCase()
  return !!/micromessenger/.test(ua)
}

// 是否是手机号码
export const isMobile = (val: any) => {
  return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(val)
}
