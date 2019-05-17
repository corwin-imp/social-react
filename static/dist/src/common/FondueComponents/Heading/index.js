import * as tslib_1 from "tslib";
import React from 'react';
import { makeHeading } from './makeHeading';
export var H1 = makeHeading(1);
export var H2 = makeHeading(2);
export var H3 = makeHeading(3);
export var H4 = makeHeading(4);
export var H5 = makeHeading(5);
export var H6 = makeHeading(6);
export var H = function (_a) {
    var _b = _a.type, type = _b === void 0 ? 1 : _b, props = tslib_1.__rest(_a, ["type"]);
    var Component = makeHeading(type);
    return React.createElement(Component, tslib_1.__assign({}, props));
};
