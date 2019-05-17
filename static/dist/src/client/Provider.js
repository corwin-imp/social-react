import * as tslib_1 from "tslib";
import '@babel/polyfill';
import React from "react";
import { Provider } from "react-redux";
import store from "../common/store/configureStore";
import DevTools from "../common/containers/DevTools";
import { BrowserRouter as Router } from "react-router-dom";
//import Routes from "../common/routes";
import Routes from "../common/containers/Routes";
var ProviderWrap = /** @class */ (function (_super) {
    tslib_1.__extends(ProviderWrap, _super);
    function ProviderWrap(props) {
        return _super.call(this, props) || this;
    }
    ProviderWrap.prototype.render = function () {
        return (React.createElement(Provider, { store: store },
            process.env.NODE_ENV !== "production" && React.createElement(DevTools, null),
            React.createElement(Router, null,
                React.createElement(Routes, null))));
    };
    return ProviderWrap;
}(React.Component));
export default ProviderWrap;
