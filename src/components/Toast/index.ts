import Toast from './index.vue';
import { createVNode, render } from 'vue'

export interface IProps {
  message?: string;
  duration?: number
}
const defaultOpt = { // 创建默认参数
  duration: 1500
}

const toast = (options: IProps) => {
  const container = document.createElement('div')
  const opt = {...defaultOpt,...options}
  const vm = createVNode(Toast, opt) // 创建vNode
  render(vm, container)
  document.body.appendChild(container)       // 添加到body上
}
export default toast