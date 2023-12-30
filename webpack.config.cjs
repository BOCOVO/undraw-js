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
};
