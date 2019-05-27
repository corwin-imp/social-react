import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Loadable from "react-loadable";
import { origin } from './env';
import { router } from './router';
import { config } from "./config";
const app = express();

app.use(cors({ credentials: true, origin }))
app.use(bodyParser.json())
app.use(cookieParser());

const expressStaticGzip = require('express-static-gzip');
import webpack from 'webpack';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import configDevClient from '../../config/webpack.dev-client.js';
import configDevServer from '../../config/webpack.dev-server.js';
import configProdClient from '../../config/webpack.prod-client.js';
import configProdServer from '../../config/webpack.prod-server.js';

const isProd: boolean = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const configDev = <any>configDevClient;

interface configsI {
	[index: number]: { mode?: string };
}
// register routes

const configs: configsI[] = [configDevClient, configDevServer]
export const  compiler = webpack(configs);
app.use("/", express.static(config.staticPath));
if (isDev) {



	const clientCompiler: any = compiler.compilers[0];
	const serverCompiler = compiler.compilers[1];

	const webpackDevMiddleware = require('webpack-dev-middleware');

	const webpackHotMiddlware = require('webpack-hot-middleware')(
		clientCompiler,
		configDev.devServer
	);
	app.use(webpackDevMiddleware(
		compiler,{
			publicPath: '/',
			serverSideRender: true,
		}

	));
	app.use(webpackHotMiddlware);
	app.use(webpackHotServerMiddleware(compiler));
	let started = false;
	// tslint:disable-next-line:no-console
	console.log("Compiling:....");
	compiler.plugin("done", () => {
		if (!started) {
			started = true;
			startServer();
		}
	});

} else {
	const configs: configsI[] = [configProdClient, configProdServer]

	webpack(configs).run((err: any, stats: any) => {
		const clientStats = stats.toJson().children[0];
		const render = require('../../build/prod-server-bundle.js').default;
		console.log(
			stats.toString({
				colors: true,
			})
		);
		app.use(
			expressStaticGzip('dist', {
				enableBrotli: true,
			})
		);
		app.use(render({ clientStats }));

	});
}
//router(app);

function startServer() {
	Loadable.preloadAll()
		.then(() => {
			app.listen(config.serverPort, (err: any) => {
				if (err) {
					// tslint:disable-next-line:no-console
					return console.error(err);
				}
				// tslint:disable-next-line:no-console
				console.log(`running at http://localhost:${config.serverPort}`);
				// tslint:disable-next-line:no-console
				console.log(`environemt: ${config.env}`);
			});
		});
}

export {app };
