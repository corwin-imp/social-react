"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const Heading_css_1 = tslib_1.__importDefault(require("./Heading.css"));
function makeHeading(h) {
    const defaultSizeStyle = Heading_css_1.default[`like-h${h}`];
    return ({ size, children, className: propsCN, bold }) => {
        const sizeStyle = size ? Heading_css_1.default[size] : defaultSizeStyle;
        const className = classnames_1.default(Heading_css_1.default.heading, propsCN, sizeStyle, {
            [Heading_css_1.default.bold]: bold,
        });
        return react_1.default.createElement(`h${h}`, { className }, children);
    };
}
exports.makeHeading = makeHeading;
