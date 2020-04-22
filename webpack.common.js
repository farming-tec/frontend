const path = require('path');
const webpack = require('webpack');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { babel, hotLoader, imgLoader, postCSS } = require('./webpack/webpack');
// const api_token = jwt.sign({ data: 'ok' }, process.env.JWT_SECRET_API , { expiresIn: '7d' });

module.exports = {
	context: path.resolve(__dirname, 'pipe'),
	entry: {
		app: "./index.jsx"
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'js/[name].bundle.js',
		chunkFilename: 'js/[name].bundle.js',
		publicPath: '/'
	},
	resolve: {
		extensions: [".js", ".jsx"],
		alias: {
			"@src": path.resolve(__dirname, 'src'),
		}
	},
	plugins:[
		// new webpack.DefinePlugin({
		// 	cima: {
		// 		API_TOKEN: JSON.stringify(api_token)
		// 	},
		// })
	],
	module: { 
		rules: [postCSS, babel, hotLoader, imgLoader] 
	}
}
