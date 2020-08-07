/*
 * @Description: Description
 * @Version: 1.0
 * @Autor: WangQiaoLing
 * @Date: 2020-08-07 21:22:32
 * @LastEditors: WangQiaoLing
 * @LastEditTime: 2020-08-07 21:30:06
 */
function bindEvent(element, type, selector = null, callback) {
  // 判断事件绑定的类型
  if (callback == null) {
    callback = selector
    selector = null
  }
  element.addEventListener(type, (event) => {
    const target = event.target

    if (selector) {
      // 事件代理
      if (target.matches(selector)) {
        callback.call(target, event)
      }
    } else {
      callback.call(target, event)
    }
  })
}
export = { bindEvent }
