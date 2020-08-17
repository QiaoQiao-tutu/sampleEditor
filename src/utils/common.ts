/*
 * @Description: Description
 * @Version: 1.0
 * @Autor: WangQiaoLing
 * @Date: 2020-08-13 13:54:43
 * @LastEditors: WangQiaoLing
 * @LastEditTime: 2020-08-17 17:57:41
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
      if (!callback) return
      callback.call(target, event)
    } else {
      if (!callback) return
      callback.call(target, event)
    }
  })
}

/**
 * @description: 获取鼠标选中文字
 * @param {type}
 * @return {Object}
 * @author: WangQiaoLing
 */
export const getSelectObj = (): object => {
  const selObj = createSelection()

  // 获取 range 对象
  const rangeObj = selObj.getRangeAt(0) // range 被赋予一个 Range 对象
  const { collapsed } = rangeObj

  return {
    // selObj,
    rangeObj,
    isSelected: collapsed ? false : true,
    txt: selObj.toString(),
  }
}
/**
 * @description: 创建一个 Selection 对象
 * @param {null} null
 * @return {Selection} Selection
 * @author: WangQiaoLing
 */
export const createSelection = (): Selection => {
  let selection = window.getSelection() as Selection
  if (!selection) {
    const doc: any = document
    selection = doc.selection.createRange()
  }
  return selection
}
