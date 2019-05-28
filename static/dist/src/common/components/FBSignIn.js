"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const FBSignIn = props => {
    return (react_1.default.createElement("section", { style: { justifyContent: 'center', display: 'flex' } },
        react_1.default.createElement("a", { style: { margin: 'auto', width: '20em', height: '3.5em' }, href: "/api/auth/facebook" },
            react_1.default.createElement(react_bootstrap_1.Button, { bsStyle: "primary", style: { margin: 'auto', width: '20em', height: '3.5em' } },
                react_1.default.createElement("p", { style: { margin: '0', padding: '0', fontSize: '1.5em' } },
                    react_1.default.createElement("i", { className: "fa fa-facebook", style: { marginRight: '1em' } }),
                    "Sign In With Facebook")))));
};
exports.default = FBSignIn;
