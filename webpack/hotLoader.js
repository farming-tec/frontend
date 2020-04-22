// Hot Loader Setup
const hotLoader = {
	test: /\.(js|jsx)$/,
	loader: 'react-hot-loader/webpack',
	include: /src/,
	include: /node_modules/
}

module.exports = hotLoader;