"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const Row_css_1 = tslib_1.__importDefault(require("./Row.css"));
function Row({ className, children, alignItems, justifyContent, }) {
    return (react_1.default.createElement("div", { className: classnames_1.default(Row_css_1.default.row, {
            [Row_css_1.default[`alignItems-${alignItems}`]]: alignItems,
            [Row_css_1.default[`justifyContent-${justifyContent}`]]: justifyContent,
        }, className) }, children));
}
exports.default = Row;
