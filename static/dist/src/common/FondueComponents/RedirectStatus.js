"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_router_1 = require("react-router");
exports.RedirectWithStatus = ({ from, to, status }) => {
    return (react_1.default.createElement(react_router_1.Route, { render: ({ staticContext }) => {
            if (staticContext) {
                staticContext.status = status;
            }
            return react_1.default.createElement(react_router_1.Redirect, { from: from, to: to });
        } }));
};
