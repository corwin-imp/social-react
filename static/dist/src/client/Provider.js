"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("@babel/polyfill");
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const configureStore_1 = tslib_1.__importDefault(require("../common/store/configureStore"));
const DevTools_1 = tslib_1.__importDefault(require("../common/containers/DevTools"));
const react_router_dom_1 = require("react-router-dom");
//import Routes from "../common/routes";
const react_hot_loader_1 = require("react-hot-loader");
const Routes_1 = tslib_1.__importDefault(require("../common/containers/Routes"));
class ProviderWrap extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (react_1.default.createElement(react_redux_1.Provider, { store: configureStore_1.default },
            process.env.NODE_ENV !== 'production' && react_1.default.createElement(DevTools_1.default, null),
            react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(Routes_1.default, null))));
    }
}
exports.default = react_hot_loader_1.hot(module)(ProviderWrap);
