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
		extensions: [".js", ".jsx", ".ts", ".tsx"],
		alias: {
			"@src": path.resolve(__dirname, 'src'),
		}
	},
	plugins:[
		new webpack.DefinePlugin({
			MQTT_SERVICE: {
				port: JSON.stringify(process.env.MQTT_PORT || 15675),
				name: JSON.stringify(process.env.MQTT_NAME || process.env.REACT_MQTT_FQDN || 'locahost'),
				ws: JSON.stringify( process.env.MQTT_WS || 'ws')
			},
		})
	],
	module: { 
		rules: [postCSS, babel, hotLoader, imgLoader] 
	}
}
