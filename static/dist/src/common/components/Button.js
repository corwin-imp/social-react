"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Button = ({ onClick, text, onCl = '' }) => (react_1.default.createElement("button", { className: onCl, type: "button", onClick: onClick }, text));
exports.default = Button;
