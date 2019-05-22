"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_universal_component_1 = tslib_1.__importDefault(require("react-universal-component"));
const GoogleTagManager_1 = tslib_1.__importDefault(require("../FondueComponents/GoogleTagManager"));
const Head_1 = require("../FondueComponents/Head");
const Nav_1 = tslib_1.__importDefault(require("../FondueComponents/Nav"));
const Footer_1 = require("../FondueComponents/Footer");
const react_router_1 = require("react-router");
const RedirectStatus_1 = require("../FondueComponents/RedirectStatus");
const Layout_1 = require("../FondueComponents/Layout");
require("../FondueComponents/FondueAssets/css/styles.css");
const isProd = process.env.NODE_ENV === 'production';
const UniversalComponent = react_universal_component_1.default(props => {
    return Promise.resolve().then(() => tslib_1.__importStar(require(`../Views/${props.page}`)));
}, {
    loading: () => {
        return react_1.default.createElement(Layout_1.Loading, null);
    },
    ignoreBabelRename: true,
});
const Routes = (props) => {
    const { lang } = props;
    return (react_1.default.createElement(react_1.Fragment, null,
        isProd ? react_1.default.createElement(GoogleTagManager_1.default, { gtmId: "GTM-WFTXGC8" }) : '',
        react_1.default.createElement(Head_1.Head, null),
        react_1.default.createElement(Nav_1.default, { lang: lang }),
        react_1.default.createElement(react_router_1.Switch, null,
            react_1.default.createElement(react_router_1.Route, { exact: true, path: "/app/:lang", render: (routeProps) => react_1.default.createElement(UniversalComponent, Object.assign({ page: "Home" }, routeProps)) }),
            react_1.default.createElement(react_router_1.Route, { exact: true, path: "/app/:lang/about", render: (routeProps) => react_1.default.createElement(UniversalComponent, Object.assign({ page: "About" }, routeProps)) }),
            react_1.default.createElement(react_router_1.Route, { exact: true, path: "/app/:lang/chats", render: (routeProps) => react_1.default.createElement(UniversalComponent, Object.assign({ page: "Chats" }, routeProps)) }),
            react_1.default.createElement(RedirectStatus_1.RedirectWithStatus, { status: 301, exact: true, from: "/", to: `/${lang}` }),
            react_1.default.createElement(react_router_1.Route, { render: (routeProps) => react_1.default.createElement(UniversalComponent, Object.assign({ page: "NotFound" }, routeProps)) })),
        react_1.default.createElement(Footer_1.Footer, null)));
};
exports.default = Routes;
