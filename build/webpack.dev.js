/*
 * @Description: 开发环境webpack打包配置
 * @Version: 1.0
 * @Autor: WangQiaoLing
 * @Date: 2020-08-07 11:35:13
 * @LastEditors: WangQiaoLing
 * @LastEditTime: 2020-08-13 17:59:52
 */
const path = require('path')
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common')
const { distPath } = require('./path')
const { merge } = require('webpack-merge')
module.exports = merge(webpackCommonConf, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        exclude: path.resolve(__dirname, 'src/component'),
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
        include: path.resolve(__dirname, 'src/component'),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('development'),
    }),
  ],
  // 本地服务
  devServer: {
    port: 8080,
    progress: true, // 显示打包的进度条
    contentBase: distPath, // 根目录
    open: true, // 自动打开浏览器
    compress: true, // 启动 gzip 压缩
    // 设置代理
    proxy: {},
  },
})
