/*
 * @Description: 常用文件路径定义
 * @Version: 1.0
 * @Autor: WangQiaoLing
 * @Date: 2020-08-07 11:21:19
 * @LastEditors: WangQiaoLing
 * @LastEditTime: 2020-08-07 14:12:17
 */
const path = require('path')
const distPath = path.resolve(__dirname, '..', 'dist')
const srcPath = path.resolve(__dirname, '..', 'src')
module.exports = {
  distPath,
  srcPath,
}
