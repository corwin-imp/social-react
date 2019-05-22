"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const ContentPusher_css_1 = tslib_1.__importDefault(require("./ContentPusher.css"));
const AppearAfter_1 = tslib_1.__importDefault(require("../../AppearAfter"));
const ContentPusher = ({ className, children }) => {
    return (react_1.default.createElement(AppearAfter_1.default, { className: classnames_1.default(ContentPusher_css_1.default.contentPusher, className), visibleClassName: ContentPusher_css_1.default.visible, delay: 600 },
        react_1.default.createElement("div", null, children)));
};
exports.default = ContentPusher;
