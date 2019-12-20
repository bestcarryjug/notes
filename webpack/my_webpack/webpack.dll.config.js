const {
    dllPlugin,
} = require('./config/pathConfig')
const webpack = require('webpack')
const {
    vendors
} = require('./config/global')

module.exports = {
    mode: 'production', //启动压缩
    entry: {
        // 定义程序中打包公共文件的入口文件vendor.js
        ...vendors
    },
    output: {
        path: dllPlugin.output,
        filename: 'js/[name].js',
        library: '[name]_[hash:5]',
        libraryTarget: 'this'
    },
    plugins: [
        new webpack.DllPlugin({
            // 定义程序中打包公共文件的入口文件vendor.js
            context: process.cwd(),
            // manifest.json文件的输出位置
            path: dllPlugin.manifestPath,
            // 定义打包的公共vendor文件对外暴露的函数名
            name: '[name]_[hash:5]'
        }),
    ]
}
