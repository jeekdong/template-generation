const path = require("path");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    templateGeneration: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs2",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
