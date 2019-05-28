"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const ChatsNavbar_1 = tslib_1.__importDefault(require("./ChatsNavbar"));
const ChatsList_1 = tslib_1.__importDefault(require("./ChatsList"));
const Container = styled_components_1.default.div `
  height: 100vh;
`;
const ChatsListScreen = () => {
    return (React.createElement(Container, null,
        "33333",
        React.createElement(ChatsNavbar_1.default, null),
        React.createElement(ChatsList_1.default, null)));
};
exports.default = ChatsListScreen;
