var path = require('path');
var webpack = require('webpack');
var CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var Dotenv = require('dotenv-webpack');
var production = process.env.NODE_ENV === 'production' || process.argv.indexOf('-p') !== -1;
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
        sourceMap: true,
        ident: 'postcss',
    },
};
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
    output: {
        filename: '[name]-bundle.[hash].js',
        chunkFilename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
    },
    devtool: 'source-map',
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
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
        }),
        new webpack.DefinePlugin({
            favicon: 'src/common/FondueComponents/FondueAssets/img/favicon.ico'
        }),
        new Dotenv(),
        new CheckerPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
};
