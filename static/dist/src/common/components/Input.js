"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Input = function ({ onChange, placeholder, onKeyPress, value, type = 'text' }) {
    const handleKeyPress = (event) => {
        console.log('ent', event.key);
        if (event.key == 'Enter') {
            onKeyPress();
        }
    };
    return (react_1.default.createElement("input", { className: "form-control", type: type, placeholder: placeholder, onKeyPress: handleKeyPress, onChange: onChange, value: value }));
};
exports.default = Input;
