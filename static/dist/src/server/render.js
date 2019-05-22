"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const server_1 = require("react-dom/server");
const react_router_1 = require("react-router");
//import Routes from '../common/routes';
const Routes_1 = tslib_1.__importDefault(require("../common/containers/Routes"));
const react_helmet_1 = require("react-helmet");
const server_2 = require("react-universal-component/server");
const webpack_flush_chunks_1 = tslib_1.__importDefault(require("webpack-flush-chunks"));
const extractLocalesFromReq_1 = tslib_1.__importDefault(require("./client-locale/extractLocalesFromReq"));
const guessLocale_1 = tslib_1.__importDefault(require("./client-locale/guessLocale"));
const constants_1 = require("./client-locale/constants");
exports.default = ({ clientStats }) => (req, res) => {
    const userLocales = extractLocalesFromReq_1.default(req);
    let lang = guessLocale_1.default(['de', 'en'], userLocales, 'en');
    if (req.originalUrl.substr(1, 2) == 'de') {
        lang = 'de';
    }
    if (req.originalUrl.substr(1, 2) == 'en') {
        lang = 'en';
    }
    const context = {};
    const app = server_1.renderToString(react_1.default.createElement(react_router_1.StaticRouter, { location: req.originalUrl, context: context },
        react_1.default.createElement(Routes_1.default, { lang: lang })));
    const helmet = react_helmet_1.Helmet.renderStatic();
    server_2.clearChunks();
    const { js, styles, cssHash } = webpack_flush_chunks_1.default(clientStats, {
        chunkNames: server_2.flushChunkNames(),
    });
    const status = context.status || 200;
    if (context.status == 404) {
        console.log('Error 404: ', req.originalUrl);
    }
    if (context.url) {
        const redirectStatus = context.status || 302;
        res.redirect(redirectStatus, context.url);
        return;
    }
    res.status(status).cookie(constants_1.LOCALE_COOKIE_NAME, lang, { maxAge: constants_1.COOKIE_MAX_AGE, httpOnly: false }).header('Content-Type', 'text/html')
        .send(`<!DOCTYPE html><html lang="${lang}"><head><meta name="theme-color" content="#000000"/>${styles}${helmet.title}${helmet.meta.toString()}${helmet.link.toString()}</head><body><div id="react-root">${app}</div>${js}${cssHash}</body></html>`);
};
