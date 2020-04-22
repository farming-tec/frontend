// [hash]- 
// Copy images loader
const imgLoader = (hash) => {

	return {
		test: /\.(png|jp(e*)g|svg)$/i,
		include: /(src|pipe)/,
		use: [
			{
				loader: 'url-loader',
				options: { 
					limit: 8000, // Convert images < 8kb to base64 strings
					name: `images/${hash}/[name].[ext]`
				} 
			}
		]
	}
}

module.exports = imgLoader;
