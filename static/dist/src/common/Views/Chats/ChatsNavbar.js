"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@material-ui/core");
const React = tslib_1.__importStar(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const Container = styled_components_1.default(core_1.Toolbar) `
  background-color: var(--primary-bg);
  color: var(--primary-text);
  font-size: 20px;
  line-height: 40px;
`;
const ChatsNavbar = () => (React.createElement(Container, null, "Whatsapp Clone"));
exports.default = ChatsNavbar;
