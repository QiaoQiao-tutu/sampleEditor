/*
 * @Description: webpack 公共配置
 * @Version: 1.0
 * @Autor: WangQiaoLing
 * @Date: 2020-08-07 11:39:49
 * @LastEditors: WangQiaoLing
 * @LastEditTime: 2020-08-17 10:22:38
 */
const path = require('path')
const { srcPath } = require('./path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: path.join(srcPath, 'index.ts'),
  resolve: {
    extensions: ['.ts', '.js', '.json', '.module.css'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // 指定特定的ts编译配置
              configFile: path.resolve(__dirname, '../tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
    }),
  ],
}
