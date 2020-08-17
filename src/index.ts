/*
 * @Description: Description
 * @Version: 1.0
 * @Autor: WangQiaoLing
 * @Date: 2020-08-07 11:21:10
 * @LastEditors: WangQiaoLing
 * @LastEditTime: 2020-08-17 17:50:41
 */
import 'babel-polyfill'
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
