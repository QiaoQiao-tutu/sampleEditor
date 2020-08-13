/*
 * @Description: Description
 * @Version: 1.0
 * @Autor: WangQiaoLing
 * @Date: 2020-08-13 13:54:43
 * @LastEditors: WangQiaoLing
 * @LastEditTime: 2020-08-13 14:27:15
 */
/**
 * @description: 通过绑定事件函数
 * @param {type}
 * @return {type}
 * @author: WangQiaoLing
 */
export const bindEvent = (
  element: Element,
  type: string,
  selector: Function | string | null,
  callback?: Function
) => {
  type EventNames = 'click'
  // 判断事件绑定的类型
  if (callback == null) {
    if (typeof selector === 'function') {
      callback = selector
    }
    selector = null
  }
  element.addEventListener(type, (event) => {
    const target = event.target
    if (selector) {
      callback ? callback.call(target, event) : ''
    } else {
      callback ? callback.call(target, event) : ''
    }
  })
}

// export { bindEvent }