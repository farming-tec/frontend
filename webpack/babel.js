// Babel as transpiler Setup
const babel = {
	test: /\.(js|jsx|ts|tsx)$/,
	exclude: /(node_modules|bower_components)/,
	use: [
		{ 
			loader: 'babel-loader',
		}
	]
}

module.exports = babel;
