import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import Loadable from "react-loadable";
import { StaticRouter } from 'react-router';
//import Routes from '../common/routes';
import Routes from '../../../common/containers/Routes';
import { Helmet } from 'react-helmet';
import { flushChunkNames, clearChunks,  } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import extractLocalesFromReq from '../../client-locale/extractLocalesFromReq';
import guessLocale from '../../client-locale/guessLocale';
import { LOCALE_COOKIE_NAME, COOKIE_MAX_AGE } from '../../client-locale/constants';
import { HtmlBuilder } from "./htmlBuilder";
import { getBundles } from 'react-loadable/webpack'


let reactLoadableStats: any = {};
if (process.env.NODE_ENV === "development") {
	// tslint:disable-next-line:no-var-requires
	reactLoadableStats = require("../../react-loadable.json");
}


export default ({ stats }: any) => {
	if (process.env.NODE_ENV === "development") {
		stats = reactLoadableStats;
	}

	const html = new HtmlBuilder(stats);

	return (req: express.Request, res: express.Response): express.RequestHandler => {
		const modules: any[] = [];
		const context: {status?: number, url?: string} = {};

		const userLocales = extractLocalesFromReq(req);
		let lang = guessLocale(['de', 'en'], userLocales, 'en');

		if (req.originalUrl.substr(1, 2) == 'de') {
			lang = 'de';
		}

		if (req.originalUrl.substr(1, 2) == 'en') {
			lang = 'en';
		}

		const component = renderToString(
			<Loadable.Capture report={(moduleName: any) => modules.push(moduleName)}>
				<StaticRouter location={req.originalUrl} context={context}>
					<Routes lang={lang} />
				</StaticRouter>
			</Loadable.Capture>
		);
		console.log('modules', modules)
		const helmet = Helmet.renderStatic();
		const status = context.status || 200;

		if (context.status == 404) {
			console.log('Error 404: ', req.originalUrl);
		}

		if (context.url) {
			const redirectStatus = context.status || 302;
			res.redirect(redirectStatus, context.url);
			return;
		}

		res.send(html.renderToString(component, modules));
	}



};
