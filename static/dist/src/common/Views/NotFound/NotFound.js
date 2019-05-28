"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const Head_1 = require("../../FondueComponents/Head");
const Status_1 = require("../../FondueComponents/Status");
const Layout_1 = require("../../FondueComponents/Layout");
function NotFound() {
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(Head_1.Head, { title: "React SSR Boilerplate \u2022 Not Found" }),
        react_1.default.createElement(Status_1.Status, { code: 404 }),
        react_1.default.createElement(Layout_1.ContentPusher, null,
            react_1.default.createElement(Layout_1.Container, null,
                react_1.default.createElement(Layout_1.Readable, null,
                    react_1.default.createElement("h1", null, "Not Found"),
                    react_1.default.createElement("p", null, "404 Error - Page not found."))))));
}
exports.default = NotFound;
