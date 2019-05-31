import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
//import Routes from '../common/routes';
import Loadable from 'react-loadable';
import Routes from '../../../common/Router';
import { Provider } from 'react-redux';

import extractLocalesFromReq from '../../client-locale/extractLocalesFromReq';
import guessLocale from '../../client-locale/guessLocale';
import { HtmlBuilder } from "./htmlBuilder";

import { LOCALE_COOKIE_NAME, COOKIE_MAX_AGE } from '../../client-locale/constants';
import store from "../../../common/store/configureStore";

const stats: any = require('../../react-loadable.json')
export default ({ clientStats }: any) => (req: express.Request, res: express.Response): any => {
	let modules: any = [];
	const userLocales = extractLocalesFromReq(req);
	let lang = guessLocale(['de', 'en'], userLocales, 'en');

	if (req.originalUrl.substr(1, 2) == 'de') {
		lang = 'de';
	}

	if (req.originalUrl.substr(1, 2) == 'en') {
		lang = 'en';
	}
	const context: any = {};
	const component = renderToString(
		<Loadable.Capture report={moduleName => modules.push(moduleName)}>
			<Provider store={store}>
			<StaticRouter  location={req.originalUrl} context={context}>
				<Routes  />
			</StaticRouter>
			</Provider>
		</Loadable.Capture>
	);
	const html = new HtmlBuilder(stats);


	console.log('modules', modules);

	const status = context.status || 200;

	if (context.status == 404) {
		console.log('Error 404: ', req.originalUrl);
	}

	if (context.url) {
		const redirectStatus = context.status || 302;
		res.redirect(redirectStatus, context.url);
		return;
	}
	res.status(status).cookie(LOCALE_COOKIE_NAME, lang, { maxAge: COOKIE_MAX_AGE, httpOnly: false }).header('Content-Type', 'text/html')
	res.send(html.renderToString(component, modules));
};
