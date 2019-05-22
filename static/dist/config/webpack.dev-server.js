var path = require('path');
var webpack = require('webpack');
var externals = require('./node-externals');
var CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CSSModuleLoader = {
    loader: 'css-loader',
    options: {
        exportOnlyLocals: true,
        modules: true,
        localIdentName: '[name]__[local]--[hash:base64:5]',
    },
};
var postCSSLoader = {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
    },
};
module.exports = {
    name: 'server',
    target: 'node',
    externals: externals,
    entry: './src/server/render.js',
    mode: 'development',
    output: {
        filename: 'dev-server-bundle.js',
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, '../build'),
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [
            {
                test: /\.js|\.jsx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]',
                            importLoaders: 1,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            ident: 'postcss',
                        },
                    },
                ],
            },
            {
                test: /\.(sass|scss)?$/,
                exclude: /node_modules/,
                use: [
                    // { loader: "style-loader" },  // to inject the result into the DOM as a style block
                    { loader: "css-modules-typescript-loader" },
                    { loader: "css-loader", options: { modules: true } },
                    { loader: "sass-loader" },
                ]
            },
            {
                test: /\.(jpg|svg|png|ico|gif|eot|woff|ttf)$/,
                use: [
                    {
                        loader: 'file-loader?name=[name].[ext]'
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
            {
                test: /\.(ts|tsx)?$/,
                use: {
                    loader: 'awesome-typescript-loader'
                },
                exclude: /node_modules/
            }
        ],
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
        extensions: [
            '.webpack.js', '.web.js',
            '.ts', '.tsx',
            '.js', '.jsx',
            '.html',
            '.json',
            '.node',
            '.css', '.less', '.sass', '.scss',
            '.woff', '.woff2', '.ttf', '.eot',
            '.svg', '.md',
            '.jpg', '.png',
        ],
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 10,
        }),
        new webpack.DefinePlugin({
            favicon: 'src/common/FondueComponents/FondueAssets/img/favicon.ico'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
        new CheckerPlugin(),
    ],
};
