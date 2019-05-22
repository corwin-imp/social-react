"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Button_1 = tslib_1.__importDefault(require("./Button"));
const Switcher = ({ feature, isSwitch, onChangeLeft, onChangeRight, leftButtonText, rightButtontext, }) => {
    if (feature) {
        var classOn = 'on';
        var classOff = '';
    }
    else {
        var classOn = '';
        var classOff = 'off';
    }
    if (isSwitch != 'power') {
        var label = react_1.default.createElement("div", { className: "btnLabel" }, feature);
        var classOn = '';
        var classOff = '';
    }
    else {
        var label = '';
    }
    return (react_1.default.createElement("div", { className: 'switcher ' + isSwitch },
        label,
        react_1.default.createElement(Button_1.default, { onCl: classOn, onClick: onChangeLeft, text: leftButtonText }),
        react_1.default.createElement(Button_1.default, { onCl: classOff, onClick: onChangeRight, text: rightButtontext })));
};
exports.default = Switcher;
