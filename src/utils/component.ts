/*
 * @Description: Description
 * @Version: 1.0
 * @Autor: WangQiaoLing
 * @Date: 2020-08-13 14:37:03
 * @LastEditors: WangQiaoLing
 * @LastEditTime: 2020-08-13 14:37:05
 */
export interface Icomponent {
  tempContainer: HTMLElement
  init: () => void
  template: () => void
  handle: () => void
}
