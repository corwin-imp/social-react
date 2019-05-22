"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const makeHeading_1 = require("./makeHeading");
exports.H1 = makeHeading_1.makeHeading(1);
exports.H2 = makeHeading_1.makeHeading(2);
exports.H3 = makeHeading_1.makeHeading(3);
exports.H4 = makeHeading_1.makeHeading(4);
exports.H5 = makeHeading_1.makeHeading(5);
exports.H6 = makeHeading_1.makeHeading(6);
exports.H = ({ type = 1, ...props }) => {
    const Component = makeHeading_1.makeHeading(type);
    return react_1.default.createElement(Component, Object.assign({}, props));
};
