/*
 * @Description: Description
 * @Version: 1.0
 * @Autor: WangQiaoLing
 * @Date: 2020-08-07 11:21:10
 * @LastEditors: WangQiaoLing
 * @LastEditTime: 2020-08-13 16:27:40
 */
import './index.css'
import toolbar from './component/toolbar/toolbar'
import content from './component/content/content'
toolbar({
  content: (toolbarElem) => {
    console.log(toolbarElem)
  },
})
content({
  content: (contentElem) => {
    console.log(contentElem)
  },
})
