const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const dir = path.resolve(__dirname, ".");

module.exports = {
	entry: "./src/app/index.tsx",
	output: {
		filename: "[name].[chunkhash:8].js",
		path: dir + "/dist",
	},
	// optimization: {
	//   splitChunks: {
	//     chunks: "all",
	//     name: false,
	//   },
	//   runtimeChunk: {
	//     name: (entrypoint) => `runtime-${entrypoint.name}`,
	//   },
	// },
	module: {
		rules: [
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "images/[name].[hash:8].[ext]",
						},
					},
				],
			},
			{
				test: /\.tsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-typescript", "@babel/preset-react"],
					},
				},
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: dir + "/index.html",
		}),
		new ImageMinimizerPlugin({
			minimizerOptions: {
				plugins: [
					["gifsicle", { interlaced: true }],
					["jpegtran", { progressive: true, quality: 70 }],
					["optipng", { optimizationLevel: 5 }],
					[
						"svgo",
						{
							plugins: [
								{
									removeViewBox: false,
								},
							],
						},
					],
				],
			},
		}),
	],
};
