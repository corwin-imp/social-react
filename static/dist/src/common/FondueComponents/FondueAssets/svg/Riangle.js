"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Svg = ({ className }) => {
    return (react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "19", height: "16", viewBox: "0 0 19 16", className: className },
        react_1.default.createElement("polygon", { fillRule: "evenodd", points: "4.536 7.832 0 15.66 18.152 15.66 9.076 0 4.536 7.832 13.609 7.832 9.073 15.66" })));
};
exports.default = Svg;
