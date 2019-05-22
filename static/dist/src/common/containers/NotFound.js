"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
class NotFound extends react_1.Component {
    render() {
        return (react_1.default.createElement("section", null,
            react_1.default.createElement("div", { className: "heading_second" }, "Device name"),
            react_1.default.createElement("div", { className: "device" },
                react_1.default.createElement("div", { className: "heading_third" }, "Options:"),
                react_1.default.createElement("div", { id: "option_1", className: "option" },
                    react_1.default.createElement("div", { className: "opt_name" }, "Volume:"),
                    react_1.default.createElement("div", { className: "opt_value" }, "Volume value")),
                react_1.default.createElement("div", { id: "option_2", className: "option" },
                    react_1.default.createElement("div", { className: "opt_name" }, "Song:"),
                    react_1.default.createElement("div", { className: "opt_value" }, "Song value")),
                react_1.default.createElement("div", { id: "option_3", className: "option" },
                    react_1.default.createElement("div", { className: "opt_name" }, "List:"),
                    react_1.default.createElement("div", { className: "opt_value" }, "option value")),
                react_1.default.createElement("div", { id: "option_4", className: "option" },
                    react_1.default.createElement("div", { className: "opt_name" }, "play:"),
                    react_1.default.createElement("div", { className: "opt_value" }, ">")))));
    }
}
exports.default = NotFound;
