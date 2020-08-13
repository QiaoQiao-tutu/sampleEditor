/*
 * @Description: Description
 * @Version: 1.0
 * @Autor: WangQiaoLing
 * @Date: 2020-08-13 15:22:36
 * @LastEditors: WangQiaoLing
 * @LastEditTime: 2020-08-13 16:23:58
 */
import styles from './content.module.css'
import { Icomponent } from '../../utils/component'

interface Icontent {
  width?: string
  height?: string
  autofocus?: boolean
  maxlength?: number
  content?: (content: HTMLElement) => void
}
function content(options) {
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
        <div class="${styles['editor-content']}" contenteditable="true">
          请输入正文...
        </div>
      </div>
    `
    containerElem.appendChild(this.tempContainer)
  }
  handle() {}
  contentCallback() {
    let contentElem = this.tempContainer.querySelector(`.${styles.main}`)
    this.settings.content ? this.settings.content(contentElem) : ''
  }
}
export default content
