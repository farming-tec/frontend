const postCSS = (hash) => {

	return {
		test: /\.(css|pcss)$/,
		exclude: /node_modules/,
		use: [
			{ loader: 'style-loader' },
			{
				loader: 'css-loader',
				options: { importLoaders: 1, url: false }
			},
			{ 
				loader: 'postcss-loader',
				// https://github.com/postcss/postcss-loader#context-ctx
				options: {
					config: {
						ctx: { hash: hash }
					}
				}
			}
		]
	}
}

module.exports = postCSS;
