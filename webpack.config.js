const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const CSR = {
  mode: 'production',
  entry: {
    index: './src/client/src/index.js',
    client: './src/client/src/client.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, './src/client/public/index.html'),
      filename: 'index.html',
      inject: 'body'
    })
  ],
  devtool: "source-map"
};

const SSR = {
  mode: 'production',
  entry: {
    client: './src/client/src/client.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  devtool: "source-map"
};

module.exports = [SSR, CSR]
