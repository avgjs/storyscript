var path = require('path');

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "index.js",
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
    ]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  }
};
