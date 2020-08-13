/*
 * @Description: 生产环境 webpack 配置
 * @Version: 1.0
 * @Autor: WangQiaoLing
 * @Date: 2020-08-07 13:51:11
 * @LastEditors: WangQiaoLing
 * @LastEditTime: 2020-08-13 17:13:04
 */
const path = require('path')
const webpack = require('webpack')
const { distPath } = require('./path')
const { merge } = require('webpack-merge')
const webpackCommonConf = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniExtractCssPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(webpackCommonConf, {
  mode: 'production',
  output: {
    // contentHash：针对 js 文件的内容计算一个hash值，如果文件内容不变，则打包文件不变，命中缓存
    filename: 'bundle.[contentHash:8].js', // 打包时，加上 hash 戳
    path: distPath,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: [MiniExtractCssPlugin.loader, 'css-loader', 'postcss-loader'],
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
    new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹

    new webpack.DefinePlugin({
      // window.ENV = 'production'
      ENV: JSON.stringify('production'),
    }),
    // 抽离 css
    new MiniExtractCssPlugin({
      filename: 'css/main.[contentHash:8].css',
    }),
  ],
  optimization: {
    // 压缩 css
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin()],
  },
})
