// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  name: 'react-webpack-setting',
  mode: 'development', // or production
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', 'css'],
  },
  entry: {
    app: ['./src/index.tsx'],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        exclude: /node_module/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.(ts)x?$/,
        exclude: /node_module/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
  },
};
