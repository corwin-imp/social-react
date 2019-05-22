"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
class Main extends react_1.Component {
    render() {
        return (react_1.default.createElement("div", { className: "page homePage" },
            react_1.default.createElement("div", { className: "category_name heading_second" }, "rooms"),
            react_1.default.createElement("div", { className: "homeSection roomsSection" },
                react_1.default.createElement("div", { className: "add" },
                    react_1.default.createElement("b", null, "Add room"),
                    react_1.default.createElement("input", { value: "" })),
                react_1.default.createElement("div", { className: "selects rooms" },
                    react_1.default.createElement("a", { href: "leasure_room" },
                        react_1.default.createElement("b", null, "leasure room")),
                    react_1.default.createElement("a", { href: "kitchen" },
                        react_1.default.createElement("b", null, "kitchen")))),
            react_1.default.createElement("div", { className: "category_name heading_second" }, "Types"),
            react_1.default.createElement("div", { className: "homeSection TypeSection" },
                react_1.default.createElement("div", { className: "add" },
                    react_1.default.createElement("b", null, "Add type"),
                    react_1.default.createElement("input", { value: "" })),
                react_1.default.createElement("div", { className: "selects types" },
                    react_1.default.createElement("a", { href: "leasure" }, "leasure"),
                    react_1.default.createElement("a", { href: "security" }, "security")))));
    }
}
exports.default = Main;
