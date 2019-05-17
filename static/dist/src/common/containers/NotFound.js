import * as tslib_1 from "tslib";
import React, { Component } from 'react';
var NotFound = /** @class */ (function (_super) {
    tslib_1.__extends(NotFound, _super);
    function NotFound() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotFound.prototype.render = function () {
        return (React.createElement("section", null,
            React.createElement("div", { className: "heading_second" }, "Device name"),
            React.createElement("div", { className: "device" },
                React.createElement("div", { className: "heading_third" }, "Options:"),
                React.createElement("div", { id: "option_1", className: "option" },
                    React.createElement("div", { className: "opt_name" }, "Volume:"),
                    React.createElement("div", { className: "opt_value" }, "Volume value")),
                React.createElement("div", { id: "option_2", className: "option" },
                    React.createElement("div", { className: "opt_name" }, "Song:"),
                    React.createElement("div", { className: "opt_value" }, "Song value")),
                React.createElement("div", { id: "option_3", className: "option" },
                    React.createElement("div", { className: "opt_name" }, "List:"),
                    React.createElement("div", { className: "opt_value" }, "option value")),
                React.createElement("div", { id: "option_4", className: "option" },
                    React.createElement("div", { className: "opt_name" }, "play:"),
                    React.createElement("div", { className: "opt_value" }, ">")))));
    };
    return NotFound;
}(Component));
export default NotFound;
