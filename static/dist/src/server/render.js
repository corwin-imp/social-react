import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
//import Routes from '../common/routes';
import Routes from '../common/containers/Routes';
import { Helmet } from 'react-helmet';
import { flushChunkNames, clearChunks, } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import extractLocalesFromReq from './client-locale/extractLocalesFromReq';
import guessLocale from './client-locale/guessLocale';
import { LOCALE_COOKIE_NAME, COOKIE_MAX_AGE } from './client-locale/constants';
export default (function (_a) {
    var clientStats = _a.clientStats;
    return function (req, res) {
        var userLocales = extractLocalesFromReq(req);
        var lang = guessLocale(['de', 'en'], userLocales, 'en');
        if (req.originalUrl.substr(1, 2) == 'de') {
            lang = 'de';
        }
        if (req.originalUrl.substr(1, 2) == 'en') {
            lang = 'en';
        }
        var context = {};
        var app = renderToString(React.createElement(StaticRouter, { location: req.originalUrl, context: context },
            React.createElement(Routes, { lang: lang })));
        var helmet = Helmet.renderStatic();
        clearChunks();
        var _a = flushChunks(clientStats, {
            chunkNames: flushChunkNames(),
        }), js = _a.js, styles = _a.styles, cssHash = _a.cssHash;
        var status = context.status || 200;
        if (context.status == 404) {
            console.log('Error 404: ', req.originalUrl);
        }
        if (context.url) {
            var redirectStatus = context.status || 302;
            res.redirect(redirectStatus, context.url);
            return;
        }
        res.status(status).cookie(LOCALE_COOKIE_NAME, lang, { maxAge: COOKIE_MAX_AGE, httpOnly: false }).header('Content-Type', 'text/html')
            .send("<!DOCTYPE html><html lang=\"" + lang + "\"><head><meta name=\"theme-color\" content=\"#000000\"/>" + styles + helmet.title + helmet.meta.toString() + helmet.link.toString() + "</head><body><div id=\"react-root\">" + app + "</div>" + js + cssHash + "</body></html>");
    };
});
