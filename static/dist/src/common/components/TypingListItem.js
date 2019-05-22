"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const TypingListItem = props => {
    const { username } = props;
    return react_1.default.createElement("span", null, username);
};
TypingListItem.proptypes = {
    username: prop_types_1.default.string.isRequired,
};
exports.default = TypingListItem;
