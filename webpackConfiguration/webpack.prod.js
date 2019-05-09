const path = require('path');
const base = require('./webpack.base.js');
const { smart } = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob'); // 匹配所需文件
const PurifyCssWebpack = require('purifycss-webpack'); // 去除冗余CSS
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const pathResolve = (targetPath) => path.resolve(__dirname, targetPath);
module.exports = smart(base, {
	mode: 'production',
	devtool: 'source-map',
	output: {
		filename: 'js/[name].[hash:7].js',
		chunkFilename: 'js/[name].[chunkhash:7].js'
	},
	optimization: {
		runtimeChunk: {
			// 被注入了 webpackJsonp 的定义及异步加载相关的定义，单独打包模块信息清单，利于缓存
			name: 'mainfest'
		},
		minimizer: [
			new OptimizeCssAssetsPlugin({}), // 压缩CSS
			new UglifyJsPlugin({ // 压缩JS
				// 启用文件缓存。缓存目录的默认路径：node_modules/.cache/uglifyjs-webpack-plugin
		        cache: true,
		        // 启用并行化。默认并发运行数：os.cpus().length - 1
		        // 并行化可以显着加速您的构建，因此强烈建议
		        parallel: true,
		        sourceMap: true,
		        uglifyOptions: {
		        	ie8: false
		        }
		      })
		],
		splitChunks: {
			// 选择对哪些块进行优化。如果提供字符串值，可选的值有 all, async, initial
			// 提供 all 可以特别强大，因为这意味着即使在异步和非异步块之间也可以共享块。
			chunks: 'all',
			// 按需加载时的最大并行请求数
			maxAsyncRequests: 5,
			// 入口点的最大并行请求数
			maxInitialRequests: 3,
			// 分割前必须共享模块的最小块数
			minChunks: 1,
			// 页面初始化时加载代码块的请求数量应该 <= 5
			maxInitialRequests: 5,
			// 要生成的块的最小大小
			minSize: 0,
			// 打包出来的文件名。如果提供 true 将自动生成基于块和缓存组密钥的名称
			// 提供字符串或函数将允许您使用自定义名称
			name: true,
			// 缓存组可以继承或覆盖 splitChunks 中的任何选项。
			// 但是 test，priority 和 reuseExistingChunk 只能在缓存组级别配置。要禁用任何默认缓存组，请将它们设置为false
			cacheGroups: {
				// 缓存组,默认将所有来源于node_modules的模块分配到叫做'venders'的缓存组,所有引用超过两次的模块分配到'default'缓存组
				vendors: {
					// 缓存组所选择的的模块范围
					test: /[\\/]node_modules[\\/]/,
					// 缓存优先级权重
					priority: 100
				}
			}
		}
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:7].css'
		}),
		new PurifyCssWebpack({
			path: glob.sync(pathResolve('src/*.html')) // 同步扫描所有html文件中所引用的css，并去除冗余样式
		})
	]
})