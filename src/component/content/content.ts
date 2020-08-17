/*
 * @Description: Description
 * @Version: 1.0
 * @Autor: WangQiaoLing
 * @Date: 2020-08-13 15:22:36
 * @LastEditors: WangQiaoLing
 * @LastEditTime: 2020-08-17 20:00:27
 */
import styles from './content.module.css'
import { Icomponent } from '../../utils/component'
import { bindEvent, getSelectObj } from '../../utils/common'
interface Icontent {
  width?: string
  height?: string
  autofocus?: boolean
  maxlength?: number
  content?: (context: Object) => void
}

function content(options: Icontent) {
  return new Content(options)
}

class Content implements Icomponent {
  tempContainer
  constructor(private settings: Icontent) {
    this.settings = Object.assign(
      {
        width: '100%',
        height: '100vh',
        autofocus: true,
        maxlength: 100,
        content: function () {},
      },
      this.settings
    )
    this.init()
  }
  init() {
    console.log('content init--')
    this.template()
    this.handle()
    this.contentCallback()
  }
  template() {
    const containerElem = document.querySelector('.container') as HTMLElement
    this.tempContainer = document.createElement('div')
    this.tempContainer.innerHTML = `
      <div class="${styles.main}">
        <textarea
          class="${styles['title-input']}"
          maxlength="${this.settings.maxlength}"
          placeholder="请输入标题..."
          autofocus="${this.settings.autofocus}"
        ></textarea>
        <div id="editContent" class="${styles['editor-content']}" contenteditable="true" tabindex="0" >请输入正文...Range.startContainer是只读属性，返回Range开始的节点。要更改节点的起始位置，请使用Range.setStart（）方法。
        </div>
      </div>
    `
    containerElem.appendChild(this.tempContainer)
  }
  handle() {
    this.onblurEvent()
  }
  onblurEvent() {
    const contentElem = document.getElementById('editContent') as Element
    bindEvent(contentElem, 'blur', () => {
      let rangeInfo = getSelectObj()
      let win: any = window
      win.beforeRangeInfo = rangeInfo
      // console.log('编辑框失焦时获取的信息：', rangeInfo)
    })
  }
  contentCallback() {
    let contentElem = this.tempContainer.querySelector(
      `.${styles.main}`
    ) as HTMLElement
    if (!this.settings.content) return
    this.settings.content({ contentElem })
  }
}
export default content
