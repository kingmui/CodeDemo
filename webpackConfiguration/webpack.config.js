const path = require('path');
const webpack = require('webpack');
const pathResolve = targetPath => path.resolve(__dirname, targetPath);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: { 
    index: pathResolve('src/index.js') // 入口文件，即要打包的js文件
  },
  output: {
    path: pathResolve('dist'), // 打包文件的位置
    filename: '[name].js' // 打包文件的名称
  },
  module: {
  	rules: [
  		{
  			test: /\.css$/,
  			use: ['style-loader', 'css-loader']
  		},
  		{
  			test: /\.(png|jpg|jpeg|svg|gif)$/,
  			use: [
  				{
  					loader: 'url-loader',
  					options: {
  						limit: 8192,
  						name: '[name].[hash:7].[ext]',
  						outputPath: 'img'
  					}
  				}
  			]
  		},
  		{
  			test: /\.(eot|woff|ttf)$/,
  			use: [
  				{
	  				loader: 'url-loader',
	  				options: {
	  					name: '[name].[hash:7].[ext]',
	  					limit: 8192,
	  					outputPath: 'font'
	  				}
  				}
  			]
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
  	]
  },
  devServer: {
  	contentBase: pathResolve('dist'),
  	port: '8080',
  	inline: true,
  	historyApiFallback: true,
  	hot: true
  },
  plugins: [
  	new HtmlWebpackPlugin({
  		template: pathResolve('dist/index.html'),
  		title: 'my-webpack'
  	}),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:7].css'
    }),
  	new webpack.HotModuleReplacementPlugin(),
  	new webpack.NamedModulesPlugin(),
  	new CleanWebpackPlugin(['dist'])
  ]
}