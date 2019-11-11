const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV;
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: mode,

  entry: './src/index.js',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },

  devServer: {
    open: true,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './postcss.config.js',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: [path.resolve(__dirname, 'src/img')],
        loader: 'file-loader?name=./fonts/[name].[ext]',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: [path.resolve(__dirname, 'src/fonts')],
        loader: 'file-loader?name=./img/[name].[ext]',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? 'style.css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
  ],
};
