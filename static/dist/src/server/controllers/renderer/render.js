"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const server_1 = require("react-dom/server");
const react_router_1 = require("react-router");
//import Routes from '../common/routes';
const react_loadable_1 = tslib_1.__importDefault(require("react-loadable"));
const Routes_1 = tslib_1.__importDefault(require("../../../common/containers/Routes"));
const react_redux_1 = require("react-redux");
const extractLocalesFromReq_1 = tslib_1.__importDefault(require("../../client-locale/extractLocalesFromReq"));
const guessLocale_1 = tslib_1.__importDefault(require("../../client-locale/guessLocale"));
const htmlBuilder_1 = require("./htmlBuilder");
const constants_1 = require("../../client-locale/constants");
const configureStore_1 = tslib_1.__importDefault(require("../../../common/store/configureStore"));
const stats = require('../../react-loadable.json');
exports.default = ({ clientStats }) => (req, res) => {
    let modules = [];
    const userLocales = extractLocalesFromReq_1.default(req);
    let lang = guessLocale_1.default(['de', 'en'], userLocales, 'en');
    if (req.originalUrl.substr(1, 2) == 'de') {
        lang = 'de';
    }
    if (req.originalUrl.substr(1, 2) == 'en') {
        lang = 'en';
    }
    const context = {};
    const component = server_1.renderToString(react_1.default.createElement(react_loadable_1.default.Capture, { report: moduleName => modules.push(moduleName) },
        react_1.default.createElement(react_redux_1.Provider, { store: configureStore_1.default },
            react_1.default.createElement(react_router_1.StaticRouter, { location: req.originalUrl, context: context },
                react_1.default.createElement(Routes_1.default, null)))));
    const html = new htmlBuilder_1.HtmlBuilder(stats);
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
    res.status(status).cookie(constants_1.LOCALE_COOKIE_NAME, lang, { maxAge: constants_1.COOKIE_MAX_AGE, httpOnly: false }).header('Content-Type', 'text/html');
    res.send(html.renderToString(component, modules));
};
