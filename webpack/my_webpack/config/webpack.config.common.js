const htmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CSSSplitWebpackPlugin = require("css-split-webpack-plugin").default
const {
	appHtml,
	appBuild,
	appIndexJs,
	cssTreeShaking,
	alias
} = require('./pathConfig')
const {
	basePath
} = require("./global")
const webpack = require('webpack')
const HappyPack = require('happypack')
//构造出一个共享进程池，在进程池中包含4个子进程
const happyThreadPool = HappyPack.ThreadPool({
	size: 4
})
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')


module.exports = ({
	environmental,
	mode
}) => {
	return {
		entry: appIndexJs,
		output: {
			filename: 'static/js/[name][hash:7].js',
			path: appBuild,
		},
		plugins: [ //插件
			new htmlWebpackPlugin({
				filename: 'index.html', //chunk名称
				template: appHtml, //模板地址
				minify: {
					collapseWhitespace: true, // 压缩空格
					minifyCSS: true, // 压缩css
					minifyJS: true, // 压缩js
					removeComments: true, // 移除注释
					caseSensitive: true, // 去除大小写
					removeScriptTypeAttributes: true, // 移除script的type属性
					removeStyleLinkTypeAttributes: true // 移除link的type属性
				}
			}),
			new miniCssExtractPlugin({ //css分离成单独文件
				// filename: "static/css/[name].[hash:7].css",
				chunkFilename: "static/css/[id].css"
			}),
			new OptimizeCSSAssetsPlugin({ //css压缩插件
				assetNameRegExp: /\.css$/g,
				cssProcessor: require("cssnano"), // //引入cssnano配置压缩选项
				cssProcessorPluginOptions: {
					preset: [
						"default",
						{
							discardComments: {
								// 移除注释
								removeAll: true
							},
							normalizeUnicode: false
						}
					]
				},
				canPrint: true
			}),
			new CSSSplitWebpackPlugin({ //css文件拆分
				size: 4000, // 超过4kb的css文件进行拆分
				filename: "[name]-[part].[ext]"
			}),
			new webpack.DefinePlugin({ //全局配置
				'process.env.BASEURL': JSON.stringify(basePath[environmental])
			}),
			new HappyPack({
				// 用唯一的标识符id，来代表当前的HappyPack是用来处理一类特定的文件
				id: 'babel',
				// 如何处理.js文件，用法和Loader配置中一样
				threadPool: happyThreadPool,
				loaders: [{
					loader: 'babel-loader',
				}]
			}),
			new HappyPack({
				id: "cssLoader",
				threadPool: happyThreadPool,
				loaders: [
					"css-loader", // 编译css
					"postcss-loader",
					"less-loader"
					// 编译less
				]
			}),
			// 清除无用 css
			new PurifyCSS({
				paths: glob.sync(cssTreeShaking)
			}),
		],
		devServer: {
			port: 3000, //端口
			open: true, //打开浏览器
			hot: true, //启用热更新
			contentBase: appBuild, //本地访问的文件地址
		},
		module: {
			rules: [{
					test: /\.(le|c)ss$/,
					use: [mode == 'production' ? miniCssExtractPlugin.loader : 'style-loader','happypack/loader?id=cssLoader']
				}, {
					test: /\.(png|jpg|jpeg|gif|svg)/,
					loader: "url-loader",
					options: {
						name: "[name]-[hash:5].[ext]",
						outputPath: mode === 'production'?"/static/images/":"images/",
						limit: 3072, // 小于3kb，进行base64转码
						publicPath: '../images',
					}
				},
				// {
				// 	test: /\.(eot|woff2?|ttf)/, //引用字体配置
				// 	use: [{
				// 		loader: "url-loader",
				// 		options: {
				// 			name: "[name]-[hash:5].min.[ext]",
				// 			limit: 5000, // 小于3kb，进行base64转码
				// 			outputPath: "/fonts/"
				// 		}
				// 	}]
				// },
				{
					test: /\.js$/, //babel处理js语法
					exclude: /node_modules/,
					use: {
						loader: 'happypack/loader?id=babel',
					}
				}
			]
		},
		resolve: { //别名配置
			extensions: [".json", ".js", ".vue"],
			alias
		},
	}
}