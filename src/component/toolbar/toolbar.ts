/*
 * @Description: Description
 * @Version: 1.0
 * @Autor: WangQiaoLing
 * @Date: 2020-08-13 14:36:38
 * @LastEditors: WangQiaoLing
 * @LastEditTime: 2020-08-17 17:54:15
 */
import styles from './toolbar.module.css'
import { bindEvent, getSelectObj, createSelection } from '../../utils/common'
import { Icomponent } from '../../utils/component'
interface Itoolbar {
  width?: string
  height?: string
  content?: (content: HTMLElement) => void
}
function toolbar(options: Itoolbar) {
  return new Toolbar(options)
}

class Toolbar implements Icomponent {
  tempContainer
  select_text
  header_type
  select_color
  startContainer
  constructor(private settings: Itoolbar) {
    this.settings = Object.assign(
      {
        width: '100%',
        height: '300px',
        content: function () {},
      },
      this.settings
    )
    this.init()
  }

  init() {
    console.log('toolbar init--')
    this.select_text = ''
    this.header_type = '<h1>'
    this.select_color = 'red'
    this.removeStorage()
    this.template()
    this.contentCallback()
    this.handle()
  }
  template() {
    const containerElem = document.querySelector('.container') as HTMLElement
    this.tempContainer = document.createElement('div')
    this.tempContainer.innerHTML = `
      <div class="${styles['editor-toolbar']}">
        <ul class="${styles['editor-toolbar-header']}" id="funcBtn">
          <li>
            <button class="${styles['editor-toolbar-header-item']}" id="boldBtn">B</button>
          </li>
          <li>
            <button class="${styles['editor-toolbar-header-item']}" id="setH1Btn">
              H1
            </button>
          </li>
          <li>
            <button class="${styles['editor-toolbar-header-item']}" id="setColorBtn">
              <input
                type="color"
                id="setColorIpt"
                class="${styles['editor-color']}"
                value="#D93030"
              />
            </button>
          </li>
        </ul>
      </div>
    `
    containerElem.appendChild(this.tempContainer)
  }
  removeStorage(): void {
    // let text = localStorage.getItem('text')
    if (localStorage.getItem('text')) {
      localStorage.removeItem('text')
    }
    if (localStorage.getItem('start')) {
      localStorage.removeItem('start')
    }
    if (localStorage.getItem('end')) {
      localStorage.removeItem('end')
    }
  }
  handle() {
    // 注册鼠标事件
    // this.mouseupEvent()
    // 注册功能栏各个事件
    this.funcBtnEvent()
    // 颜色事件
    this.colorEvent()
  }
  colorEvent() {
    const colorElem = document.getElementById('setColorIpt') as Element
    bindEvent(colorElem, 'change', () => {
      const { value } = document.querySelector(
        '#setColorIpt'
      ) as HTMLInputElement
      if (!this.select_text) return
      console.log('setColorIpt change ', value)
      this.select_color = value
      this.toExecCommandFunc('foreColor', false, this.select_color)
    })
  }
  mouseupEvent() {
    window.addEventListener('mouseup', (e) => {
      console.log('mouseup')
    })
  }
  funcBtnEvent() {
    const btnElem = document.getElementById('funcBtn') as Element
    bindEvent(btnElem, 'click', 'button', (e: Event) => {
      const { id } = e.target as HTMLElement
      if (id === 'funcBtn') return

      const rangeObj = getSelectObj() as Range
      // console.log('event selObj--', rangeObj)
      let win: any = window
      // console.log('全局：', win.beforeRangeInfo)

      if (rangeObj['isSelected']) {
        this.select_text = rangeObj['txt']
      } else if (win.beforeRangeInfo['isSelected']) {
        const { startOffset, endOffset } = win.beforeRangeInfo.rangeObj

        const contentElem = document.getElementById('editContent') as Element
        const textNode = contentElem.firstChild as Node
        const selection = createSelection()
        const rangeObj = new Range()
        console.log(textNode)
        rangeObj.setStart(textNode, startOffset)
        rangeObj.setEnd(textNode, endOffset)
        // 所有内容变为非选取状态
        selection.removeAllRanges()
        // 然后自动选取某个区域
        selection.addRange(rangeObj)
        this.select_text = selection.toString()
      } else {
        return
      }
      // console.log('最终获取select_text', this.select_text)

      switch (id) {
        case 'boldBtn':
          console.log('加粗')
          this.toExecCommandFunc('bold', false, this.select_text)
          break
        case 'setH1Btn':
          this.toExecCommandFunc('formatBlock', false, this.header_type)
          break
        default:
          break
      }
    })
  }
  toExecCommandFunc(commod: string, flag: boolean, value: string) {
    try {
      let res = document.execCommand(commod, flag, value)
      console.log(res)
    } catch (error) {
      console.error(`${commod} commond excutes has error: ${error}`)
    }
  }
  contentCallback() {
    let toolbarElem = this.tempContainer.querySelector(
      `.${styles['editor-toolbar']}`
    )
    if (!this.settings.content) return
    this.settings.content(toolbarElem)
  }
}

export default toolbar
