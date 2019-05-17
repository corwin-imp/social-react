import React from 'react';
import FontAwesome from 'react-fontawesome';
import Button from './Button';
var List = function (_a) {
    var items = _a.items, title = _a.title, playing = _a.playing, ondelete = _a.ondelete, classValue = _a.classValue, onChoose = _a.onChoose, limit = _a.limit;
    if (limit) {
        items = items.slice(0, limit);
    }
    return (React.createElement("ul", { className: classValue }, items.map(function (value, index) { return (React.createElement("li", { key: index },
        React.createElement("div", { onClick: function () { return onChoose(index); }, className: "playIt" },
            React.createElement(Button, { text: playing === index ? (React.createElement(FontAwesome, { className: "super-crazy-colors", name: "pause", size: "lg", style: { textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' } })) : (React.createElement(FontAwesome, { className: "super-crazy-colors", name: "play", size: "lg" })) }),
            React.createElement("span", null, value.name)),
        ondelete && React.createElement("div", { onClick: function () { return ondelete(value.name, index); }, className: "deleteBtn" }, "x"))); })));
};
export default List;
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
