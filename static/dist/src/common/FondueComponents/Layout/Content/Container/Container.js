"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const Container_css_1 = tslib_1.__importDefault(require("./Container.css"));
const Container = ({ className, children, fluid = false }) => {
    return (react_1.default.createElement("div", { className: classnames_1.default(Container_css_1.default.container, {
            [Container_css_1.default.containerFluid]: fluid,
        }, className) }, children));
};
exports.default = Container;
