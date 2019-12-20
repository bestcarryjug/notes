const {
    dllPlugin
} = require('./pathConfig')
const webpack = require('webpack')
const vendors = ['vue']



module.exports = {
    dll: {
        mode:'production',
        entry: {
            // 定义程序中打包公共文件的入口文件vendor.js
            vendors
        },
        output: {
            path: dllPlugin.output,
            filename: 'dll/[name].dll.js',
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
            // new webpack.optimize.UglifyJsPlugin({ //做一个压缩
            //     compress: {
            //         warnings: false,
            //         drop_console: true, //去掉空格
            //         drop_debugger: true //去掉debugger
            //     },
            //     output: {
            //         // 去掉注释内容
            //         comments: false,
            //     },
            //     sourceMap: true
            // })

        ]
    },
    // dllReferencePlugin: () => {
    //     vendors.forEach(el => {
    //         new AddAssetHtmlWebpackPlugin({
    //                 filepath: dllPlugin.dllJs(el) // 对应的 dll 文件路径
    //             }),
    //             new webpack.DllReferencePlugin({
    //                 manifest: dllPlugin.manifestJson(el)
    //             })
    //     })
    // }

}