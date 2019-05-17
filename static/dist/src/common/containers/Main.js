import * as tslib_1 from "tslib";
import React, { Component } from 'react';
var Main = /** @class */ (function (_super) {
    tslib_1.__extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.render = function () {
        return (React.createElement("div", { className: "page homePage" },
            React.createElement("div", { className: "category_name heading_second" }, "rooms"),
            React.createElement("div", { className: "homeSection roomsSection" },
                React.createElement("div", { className: "add" },
                    React.createElement("b", null, "Add room"),
                    React.createElement("input", { value: "" })),
                React.createElement("div", { className: "selects rooms" },
                    React.createElement("a", { href: "leasure_room" },
                        React.createElement("b", null, "leasure room")),
                    React.createElement("a", { href: "kitchen" },
                        React.createElement("b", null, "kitchen")))),
            React.createElement("div", { className: "category_name heading_second" }, "Types"),
            React.createElement("div", { className: "homeSection TypeSection" },
                React.createElement("div", { className: "add" },
                    React.createElement("b", null, "Add type"),
                    React.createElement("input", { value: "" })),
                React.createElement("div", { className: "selects types" },
                    React.createElement("a", { href: "leasure" }, "leasure"),
                    React.createElement("a", { href: "security" }, "security")))));
    };
    return Main;
}(Component));
export default Main;
