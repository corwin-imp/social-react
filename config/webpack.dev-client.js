const path = require('path');
const webpack = require('webpack');

import { ReactLoadablePlugin } from 'react-loadable/webpack';
const { CheckerPlugin } = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

let production = process.env.NODE_ENV === 'production' || process.argv.indexOf('-p') !== -1;
const CSSModuleLoader = {
	loader: 'css-loader',
	options: {
		exportOnlyLocals: true,
		modules: true,
		localIdentName: '[name]__[local]--[hash:base64:5]',
	},
};

const postCSSLoader = {
	loader: 'postcss-loader',
	options: {
		sourceMap: true,
		ident: 'postcss',
	},
};
const clientConfig = {
	name: 'client',
	entry: ['webpack-hot-middleware/client', path.resolve('src', 'client', 'index.tsx')],
	mode: 'development',
	output: {
		filename: '[name]-bundle.[hash].js',
		chunkFilename: '[name].[hash].js',
		//path: path.resolve(__dirname, '../dist'),
		publicPath: "/static/",
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx)?$/,
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
				exclude: /node_modules/, // Ignore the folder containing 3rd party scripts
				use: [
					// { loader: "style-loader" },  // to inject the result into the DOM as a style block
					{ loader: 'css-modules-typescript-loader'},  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
					{ loader: 'css-loader', options: { modules: true } },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
					{ loader: 'sass-loader' },  // to convert SASS to CSS
					// NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
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
			'.js', '.jsx','json',
			'.html',
			'.json',
			'.node',
			'.css', '.less', '.sass', '.scss',
			'.woff', '.woff2', '.ttf', '.eot',
			'.svg', '.md',
			'.jpg', '.png',
		],
	},
	optimization: {
		splitChunks: {
			chunks: 'async',
			minSize: Infinity,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: 'manifest',
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		}
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].css',
		}),
		new webpack.DefinePlugin({
			favicon: 'src/common/FondueComponents/FondueAssets/img/favicon.ico',
			'process.env.BROWSER': true,
		}),
		new Dotenv(),
		new CheckerPlugin(),
		new ReactLoadablePlugin({
			filename: 'src/server/react-loadable.json',
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
};
export default clientConfig
