const { dllJs, manifestJson } = require('./pathConfig')
const { vendors } = require('./global')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')

let dllArray = [];
Object.keys(vendors).forEach(key => {
  [].push.call(dllArray, new AddAssetHtmlWebpackPlugin({
    filepath: dllJs(key) // 对应的 dll 文件路径
  }), new webpack.DllReferencePlugin({
    manifest: manifestJson(key)
  }))
})

module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map", // 开发环境配置生成错误报告
  plugins: [
    ...dllArray
  ]
}