"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const Button_css_1 = tslib_1.__importDefault(require("./Button.css"));
function Button({ className, id, children, onClick, href, target }) {
    if (href) {
        return (react_1.default.createElement("a", { href: href, target: target, className: classnames_1.default(Button_css_1.default.button, className), id: id }, children));
    }
    return (react_1.default.createElement("button", { onClick: onClick, className: classnames_1.default(Button_css_1.default.button, className), id: id }, children));
}
exports.default = Button;
