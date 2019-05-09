const path = require('path');
const webpack = require('webpack');
const base = require('./webpack.base.js');
const { smart } = require('webpack-merge');
const pathResolve = (targetPath) => path.resolve(__dirname, targetPath);
module.exports = smart(base, {
	mode: 'development',
	output: {
		filename: 'js/[name].[hash:7].js'
	},
	devServer: {
		contentBase: pathResolve('dist'),
		compress: true,
		historyApiFallback: true,
		inline: true,
		open: true,
		overlay: {
			warnings: true,
			errors: true
		},
		port: '8080',
		// publicPath: '/assets/',
		hot: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]
})