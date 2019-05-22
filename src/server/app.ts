import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { origin } from './env';
import { router } from './router';
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

let isBuilt = false;



/*
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	isBuilt = true;
	console.log(
		`Server listening on \x1b[42m\x1b[1mhttp://localhost:${PORT}\x1b[0m in \x1b[41m${
			process.env.NODE_ENV
		}\x1b[0m 🌎...`
	);
});*/
const configDev = <any>configDevClient;
const done = () => {
	!isBuilt && console.log('Done');
};
interface configsI {
	[index: number]: { mode?: string };
}
// register routes

const configs: configsI[] = [configDevClient, configDevServer]
export const  compiler = webpack(configs);

if (isDev) {



	const clientCompiler: any = compiler.compilers[0];
	const serverCompiler = compiler.compilers[1];

	const webpackDevMiddleware = require('webpack-dev-middleware')(
		compiler,
		configDev.devServer
	);

	const webpackHotMiddlware = require('webpack-hot-middleware')(
		clientCompiler,
		configDev.devServer
	);

	app.use(webpackDevMiddleware);
	app.use(webpackHotMiddlware);
	//app.use('/app', webpackHotServerMiddleware(compiler));
	//app.get('/*', webpackHotServerMiddleware(compiler));
	console.log('Middleware enabled');
	done();

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
		done();
	});
}
router(app);
export {app };
