const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	entry: "./modules/index.js",
    plugins: [
        new CleanWebpackPlugin()
    ],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	},
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
	},
};
