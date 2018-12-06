const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/client/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  devtool: 'source-map'
};
