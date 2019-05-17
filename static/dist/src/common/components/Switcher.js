import React from 'react';
import Button from './Button';
var Switcher = function (_a) {
    var feature = _a.feature, isSwitch = _a.isSwitch, onChangeLeft = _a.onChangeLeft, onChangeRight = _a.onChangeRight, leftButtonText = _a.leftButtonText, rightButtontext = _a.rightButtontext;
    if (feature) {
        var classOn = 'on';
        var classOff = '';
    }
    else {
        var classOn = '';
        var classOff = 'off';
    }
    if (isSwitch != 'power') {
        var label = React.createElement("div", { className: "btnLabel" }, feature);
        var classOn = '';
        var classOff = '';
    }
    else {
        var label = '';
    }
    return (React.createElement("div", { className: 'switcher ' + isSwitch },
        label,
        React.createElement(Button, { onCl: classOn, onClick: onChangeLeft, text: leftButtonText }),
        React.createElement(Button, { onCl: classOff, onClick: onChangeRight, text: rightButtontext })));
};
export default Switcher;
