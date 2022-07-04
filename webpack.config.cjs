module.exports = {
  /* module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  balel increase the size of bunble to 11.9 KiB
  */
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "index.min.js",
  },
  resolve: {
    extensions: ['.js'],
  },
}
