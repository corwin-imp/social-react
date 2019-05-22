"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const Readable_css_1 = tslib_1.__importDefault(require("./Readable.css"));
const Readable = ({ className, children }) => {
    return react_1.default.createElement("div", { className: classnames_1.default(Readable_css_1.default.readable, className) }, children);
};
exports.default = Readable;
