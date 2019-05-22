"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Loading_css_1 = tslib_1.__importDefault(require("./Loading.css"));
const logo_svg_1 = tslib_1.__importDefault(require("../FondueAssets/images/logo.svg"));
function Loading() {
    return (react_1.default.createElement("div", { className: Loading_css_1.default.loading },
        react_1.default.createElement("img", { src: logo_svg_1.default, alt: "Loading Logo" })));
}
exports.default = Loading;
