var path = require('path');
var webpack = require('webpack');
var externals = require('./node-externals');
var OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
module.exports = {
    name: 'server',
    target: 'node',
    externals: externals,
    entry: './src/server/render.js',
    mode: 'production',
    output: {
        filename: 'prod-server-bundle.js',
        path: path.resolve(__dirname, '../build'),
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                exclude: /node_modules/,
                test: /\.graphql$/,
                use: [{ loader: 'graphql-import-loader' }]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            exportOnlyLocals: true,
                            localIdentName: '[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|svg|png|ico|gif|eot|woff|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '/images/[name].[ext]',
                            emitFile: false,
                        },
                    },
                ],
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'markdown-with-front-matter-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new OptimizeCssnanoPlugin({
            cssnanoOptions: {
                preset: [
                    'default',
                    {
                        discardComments: {
                            removeAll: true,
                        },
                    },
                ],
            },
        }),
    ],
};
