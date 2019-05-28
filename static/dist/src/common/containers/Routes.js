"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const GoogleTagManager_1 = tslib_1.__importDefault(require("../FondueComponents/GoogleTagManager"));
const Head_1 = require("../FondueComponents/Head");
const Nav_1 = tslib_1.__importDefault(require("../FondueComponents/Nav"));
const Footer_1 = require("../FondueComponents/Footer");
const react_loadable_1 = tslib_1.__importDefault(require("react-loadable"));
const react_hot_loader_1 = require("react-hot-loader");
const react_router_1 = require("react-router");
const RedirectStatus_1 = require("../FondueComponents/RedirectStatus");
const Layout_1 = require("../FondueComponents/Layout");
require("../FondueComponents/FondueAssets/css/styles.css");
const isProd = process.env.NODE_ENV === 'production';
const AsyncHomePage = react_loadable_1.default({
    loader: () => Promise.resolve().then(() => tslib_1.__importStar(require("../Views/Home"))),
    loading: Layout_1.Loading,
    modules: ['../Views/Home'],
});
const Routes = (props) => {
    const { lang } = props;
    return (react_1.default.createElement(react_1.Fragment, null,
        isProd ? react_1.default.createElement(GoogleTagManager_1.default, { gtmId: "GTM-WFTXGC8" }) : '',
        react_1.default.createElement(Head_1.Head, null),
        react_1.default.createElement(Nav_1.default, { lang: lang }),
        react_1.default.createElement(react_router_1.Switch, null,
            react_1.default.createElement(react_router_1.Route, { exact: true, path: "/en", component: AsyncHomePage }),
            react_1.default.createElement(RedirectStatus_1.RedirectWithStatus, { status: 301, exact: true, from: "/", to: `/${lang}` })),
        react_1.default.createElement(Footer_1.Footer, null)));
};
/*
<Route
    exact
    path="/:lang"
    render={(routeProps: interfaceProp) => <UniversalComponent page="Home" {...routeProps} />}
/>
<Route
exact
path="/:lang/about"
render={(routeProps: interfaceProp) => <UniversalComponent page="About" {...routeProps} />}
/>
<Route
    exact
    path="/:lang/chats"
    render={(routeProps: interfaceProp) => <UniversalComponent page="Chats" {...routeProps} />}
/>
<Route render={(routeProps: interfaceProp) => <UniversalComponent page="NotFound" {...routeProps} />} />

*/
exports.default = react_hot_loader_1.hot(module)(Routes);
