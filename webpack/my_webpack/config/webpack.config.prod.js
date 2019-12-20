const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

module.exports = {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(), //清空dist目录
    new BundleAnalyzerPlugin(), //打包分析
    new HardSourceWebpackPlugin({
      // cacheDirectory是在高速缓存写入。默认情况下，将缓存存储在node_modules下的目录中，因此如 
      // 果清除了node_modules，则缓存也是如此
      cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
      // Either an absolute path or relative to webpack's options.context.
      // Sets webpack's recordsPath if not already set.
      recordsPath: 'node_modules/.cache/hard-source/[confighash]/records.json',
      // configHash在启动webpack实例时转换webpack配置，并用于cacheDirectory为不同的webpack配 
      // 置构建不同的缓存
      configHash: function(webpackConfig) {
         // node-object-hash on npm can be used to build this.
         return require('node-object-hash')({sort: false}).hash(webpackConfig);
      },
      // 当加载器，插件，其他构建时脚本或其他动态依赖项发生更改时，hard-source需要替换缓存以确保输 
      // 出正确。environmentHash被用来确定这一点。如果散列与先前的构建不同，则将使用新的缓存
      environmentHash: {
         root: process.cwd(),
         directories: [],
         files: ['package-lock.json', 'yarn.lock'],
      },
  })
  ],
  optimization: { 
    splitChunks: {
      // 提取公共代码
      chunks: "all", //  async(动态加载模块)，initital（入口模块），all（全部模块入口和动态的）
      minSize: 3000, // 抽取出来的文件压缩前最小大小
      maxSize: 0, // 抽取出来的文件压缩前的最大大小
      minChunks: 1, // 被引用次数,默认为1
      maxAsyncRequests: 5, // 最大的按需(异步)加载次数，默认为 5；
      maxInitialRequests: 3, // 最大的初始化加载次数，默认为 3；
      automaticNameDelimiter: "~", // 抽取出来的文件的自动生成名字的分割符，默认为 ~；
      name: "vendor/vendor", // 抽取出的文件名，默认为true，表示自动生成文件名
      cacheGroups: {
        // 缓存组
        common: {
          // 将node_modules模块被不同的chunk引入超过1次的抽取为common
          test: /[\\/]node_modules[\\/]/,
          name: "common",
          chunks: "initial",
          priority: 2,
          minChunks: 2
        },
        default: {
          reuseExistingChunk: true, // 避免被重复打包分割
          filename: "common.js", // 其他公共函数打包成common.js
          priority: -20
        }
      }
    },
    usedExports:true,//js Tree Shaking清除无用js代码
  },

}