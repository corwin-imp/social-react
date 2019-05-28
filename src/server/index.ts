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
import Loadable from "react-loadable";
const expressStaticGzip = require('express-static-gzip');
import webpack from 'webpack';

import path from "path";
const configDevClient = require('../../config/webpack.dev-client.js').default;
const configDevServer = require('../../config/webpack.dev-server.js').default;
const configProdClient = require('../../config/webpack.prod-client.js').default;
const configProdServer = require('../../config/webpack.prod-server.js').default;


const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const isProd: boolean = process.env.NODE_ENV === 'production';
const isDev = !isProd;

let isBuilt = false;



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
app.use("/static/", express.static(path.resolve(__dirname, "../src/public")));
if (isDev) {



	const clientCompiler: any = compiler.compilers[0];
	const serverCompiler = compiler.compilers[1];

	app.use(webpackDevMiddleware(
		compiler,{
			publicPath: '/static/',
			serverSideRender: true,
		}

	));

	app.use(webpackHotMiddleware(clientCompiler));

	let started = false;
	// tslint:disable-next-line:no-console
	console.log("Compiling:....");
	compiler.plugin("done", () => {
		if (!started) {
			started = true;
			startServer();
		}
	});

	console.log('Middleware enabled');
	router(app);


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


function startServer() {
	Loadable.preloadAll()
		.then(() => {
			app.listen(4000, (err: any) => {
				if (err) {
					// tslint:disable-next-line:no-console
					return console.error(err);
				}
				// tslint:disable-next-line:no-console
				console.log(`running at http://localhost:4000`);
				// tslint:disable-next-line:no-console
				console.log(`environemt: dev`);
			});
		});
}
export {app };
