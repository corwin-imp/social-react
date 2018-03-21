var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/client/index'
  ],
  output: {
    path: path.resolve(__dirname, './static/dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          plugins: [
            [
              'react-transform', {
                transforms: [{
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module']
                }, {
                  transform: 'react-transform-catch-errors',
                  imports: ['react', 'redbox-react']
                }]
              }
            ]
          ]
        },
        include: [path.resolve(__dirname, 'src')]
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
  plugins: [
    new ExtractTextPlugin( "bundle.css" ),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ],
};
