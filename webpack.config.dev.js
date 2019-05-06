const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  name: 'client',

  entry: {
    vendor: ['react', 'react-dom'],
    main: [
      'react-hot-loader/patch',
      '@babel/runtime/regenerator',
      'webpack-hot-middleware/client?reload=true',
      './src/main.js',
    ],
  },
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: '[name]-bundle.[hash].js',
    chunkFilename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },

      { test: /\.sass$/, loader: ExtractTextPlugin.extract( 'style-loader', 'css-loader!sass-loader' ) },
      {
        test: /\.css?$/,
        loaders: ['style', 'raw']
      },
      {
          test: /\.(png|jpg)$/,
          loader: 'url?limit=25000'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }



    ]

  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    new ExtractTextPlugin( "bundle.css" ),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        WEBPACK: true,
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
