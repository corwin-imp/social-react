import React from 'react';
var Button = function (_a) {
    var onClick = _a.onClick, text = _a.text, _b = _a.onCl, onCl = _b === void 0 ? '' : _b;
    return (React.createElement("button", { className: onCl, type: "button", onClick: onClick }, text));
};
export default Button;
