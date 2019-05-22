"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_fontawesome_1 = tslib_1.__importDefault(require("react-fontawesome"));
const Button_1 = tslib_1.__importDefault(require("./Button"));
const List = ({ items, title, playing, ondelete, classValue, onChoose, limit }) => {
    if (limit) {
        items = items.slice(0, limit);
    }
    return (react_1.default.createElement("ul", { className: classValue }, items.map((value, index) => (react_1.default.createElement("li", { key: index },
        react_1.default.createElement("div", { onClick: () => onChoose(index), className: "playIt" },
            react_1.default.createElement(Button_1.default, { text: playing === index ? (react_1.default.createElement(react_fontawesome_1.default, { className: "super-crazy-colors", name: "pause", size: "lg", style: { textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' } })) : (react_1.default.createElement(react_fontawesome_1.default, { className: "super-crazy-colors", name: "play", size: "lg" })) }),
            react_1.default.createElement("span", null, value.name)),
        ondelete && react_1.default.createElement("div", { onClick: () => ondelete(value.name, index), className: "deleteBtn" }, "x"))))));
};
exports.default = List;
/*

 if(limit){
 items = items.slice(0, limit);
 }
 return (

 <ul className={classValue}>
 {items.map(
 (value, index) =>

 <li key={index}>
 <span onClick={() => onChoose(value.href, value.name)}  >{value.name}</span>
 </li>

 )}
 </ul>
 );}
 */
