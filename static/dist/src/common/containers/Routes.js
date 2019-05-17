import * as tslib_1 from "tslib";
import React, { Fragment } from 'react';
import universal from 'react-universal-component';
import GoogleTagManager from '../FondueComponents/GoogleTagManager';
import { Head } from '../FondueComponents/Head';
import Nav from '../FondueComponents/Nav';
import { Footer } from '../FondueComponents/Footer';
import { Route, Switch } from 'react-router';
import { RedirectWithStatus } from '../FondueComponents/RedirectStatus';
import { Loading } from '../FondueComponents/Layout';
import '../FondueComponents/FondueAssets/css/styles.css';
var isProd = process.env.NODE_ENV === 'production';
var UniversalComponent = universal(function (props) {
    return import("../Views/" + props.page);
}, {
    loading: function () {
        return React.createElement(Loading, null);
    },
    ignoreBabelRename: true,
});
var Routes = function (_a) {
    var lang = _a.lang;
    return (React.createElement(Fragment, null,
        isProd ? React.createElement(GoogleTagManager, { gtmId: "GTM-WFTXGC8" }) : '',
        React.createElement(Head, null),
        React.createElement(Nav, { lang: lang }),
        React.createElement(Switch, null,
            React.createElement(Route, { exact: true, path: "/:lang", render: function (routeProps) { return React.createElement(UniversalComponent, tslib_1.__assign({ page: "Home" }, routeProps)); } }),
            React.createElement(Route, { exact: true, path: "/:lang/about", render: function (routeProps) { return React.createElement(UniversalComponent, tslib_1.__assign({ page: "About" }, routeProps)); } }),
            React.createElement(RedirectWithStatus, { status: 301, exact: true, from: "/", to: "/" + lang }),
            React.createElement(Route, { render: function (routeProps) { return React.createElement(UniversalComponent, tslib_1.__assign({ page: "NotFound" }, routeProps)); } })),
        React.createElement(Footer, null)));
};
export default Routes;
