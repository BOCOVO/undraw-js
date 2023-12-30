const webpack = require("webpack");
const packageJson = require("./package.json");

const definePlugin = new webpack.DefinePlugin({
  UNDRAW_JS_VERSION: JSON.stringify(packageJson.version),
});

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "index.min.js",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  plugins: [definePlugin],
};
