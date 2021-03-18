const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

// we dont need babel in local dev in chrome, it already does understand the ES6,7,8 features

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    publicPath: "/",
    hot: true,
  },
});
