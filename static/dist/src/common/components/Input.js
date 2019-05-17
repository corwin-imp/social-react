import React from 'react';
var Input = function (_a) {
    var onChange = _a.onChange, placeholder = _a.placeholder, onKeyPress = _a.onKeyPress, value = _a.value, _b = _a.type, type = _b === void 0 ? 'text' : _b;
    var handleKeyPress = function (event) {
        console.log('ent', event.key);
        if (event.key == 'Enter') {
            onKeyPress();
        }
    };
    return (React.createElement("input", { className: "form-control", type: type, placeholder: placeholder, onKeyPress: handleKeyPress, onChange: onChange, value: value }));
};
export default Input;
