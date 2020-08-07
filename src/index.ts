/*
 * @Description: Description
 * @Version: 1.0
 * @Autor: WangQiaoLing
 * @Date: 2020-08-07 11:21:10
 * @LastEditors: WangQiaoLing
 * @LastEditTime: 2020-08-07 22:30:53
 */
let SELECT_Text = ''
let SELECT_COLOR = 'red'
let HEADER_TYPE = '<h1>'
let insertHead = true
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
/**
 * @description: 绑定颜色选择事件
 * @param {type}
 * @return {type}
 * @author: WangQiaoLing
 */
bindEvent(document.getElementById('setColorIpt'), 'change', null, (e) => {
  const { value } = document.querySelector('#setColorIpt') as HTMLInputElement
  console.log('setColorIpt change ', value)
  SELECT_COLOR = value
  toExecCommandFunc('foreColor', SELECT_COLOR)
})
/**
 * @description: 鼠标选中事件
 * @param {type}
 * @return {type}
 * @author: WangQiaoLing
 */
document.onmouseup = function () {
  SELECT_Text = window.getSelection().toString()
}

/**
 * @description: 利用事件冒泡机制捕获 功能按钮
 * @param {type}
 * @return {type}
 * @author: WangQiaoLing
 */
bindEvent(document.getElementById('funcBtn'), 'click', 'button', (e) => {
  const { id } = e.target as HTMLElement
  switch (id) {
    case 'boldBtn':
      toExecCommandFunc('bold', SELECT_Text)
      break
    case 'setH1Btn':
      toExecCommandFunc('formatBlock', HEADER_TYPE)
      // if (insertHead) {
      //   toExecCommandFunc('formatBlock', HEADER_TYPE)
      //   insertHead = false
      // } else {
      //   toExecCommandFunc('insertText', '')
      // }

      break
    default:
      break
  }
})

/**
 * @description: 执行 Command 函数
 * @param {commod} : 命令类型
 * @return {value} : 值
 * @author: WangQiaoLing
 */
function toExecCommandFunc(commod, value) {
  try {
    let res = document.execCommand(commod, false, value)
    console.log(res)
  } catch (error) {
    console.error(`${commod} commond excutes has error: ${error}`)
  }
}
