"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const svg_1 = require("../FondueAssets/svg");
const Layout_1 = require("../Layout");
const styles = tslib_1.__importStar(require("./Footer.css"));
const Footer = ({ className }) => {
    return (react_1.default.createElement("footer", { className: classnames_1.default(styles.footer, className) },
        react_1.default.createElement(Layout_1.ContentPusher, null,
            react_1.default.createElement("a", { href: "https://github.com/luangjokaj/react-fondue", target: "_blank" },
                react_1.default.createElement(svg_1.GitHub, null)))));
};
exports.Footer = Footer;
