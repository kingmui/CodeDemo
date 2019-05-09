const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const pathResolve = (targetPath) => path.resolve(__dirname, targetPath);
const devMode = process.env.NODE_ENV !== 'production';
// 在 Node 中，有全局变量 process 表示的是当前的 Node 进程
// process.env 包含着关于系统环境的信息
// NODE_ENV 是一个用户自定义的变量，在 webpack 中它的用途是判断当前是生产环境或开发环境
// 我们可以通过 cross-env 将 NODE_ENV=development 写入 npm run dev 的指令中，从而注入 NODE_ENV 变量

module.exports = {
	entry: {
		index: pathResolve('src/index.js')
	},
	output: {
		path: pathResolve('dist')
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: '/node_modules/'
			},
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader',
					options: {
						attrs: ['img:src']
					}
				}
			},
			{
				test: /\.(eot|woff|woff2|ttf)$/,
				use: [{
					loader: 'url-loader',
					options: {
						name: '[name].[hash:7].[ext]',
						limit: 8192,
						outputPath: 'font'
					}
				}]
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					devMode ? 'style-loader' : {
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpg|jpeg|svg|gif)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: '[name].[hash:7].[ext]',
						outputPath: 'img'
					}
				}]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			minify: {
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				removeComments: true
			},
			filename: pathResolve('dist/index.html'),
			template: pathResolve('src/index.html')
		})
	]
}