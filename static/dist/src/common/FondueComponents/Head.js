"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_helmet_1 = require("react-helmet");
//import * as favicon from './FondueAssets/img/favicon.ico';
const isProd = process.env.NODE_ENV === 'production';
const Head = ({ title = 'ReactFondue • Minimal boilerplate with code splitting, hot module reload and server side rendering', description = 'ReactFondue is minimal React boilerplate with support for code splitting, hot module reload and server side rendering.', image = 'https://i.postimg.cc/543n5bF6/preview.jpg', children, }) => {
    return (react_1.default.createElement(react_helmet_1.Helmet, { encodeSpecialCharacters: true },
        react_1.default.createElement("meta", { "http-equiv": "", content: "IE=edge" }),
        react_1.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
        react_1.default.createElement("meta", { name: "description", content: description }),
        react_1.default.createElement("meta", { property: "og:title", content: title }),
        react_1.default.createElement("meta", { property: "og:description", content: description }),
        react_1.default.createElement("meta", { property: "og:image", content: image }),
        react_1.default.createElement("link", { rel: "icon", sizes: "192x192", href: "https://i.postimg.cc/FRsbCkJ1/192.jpg" }),
        react_1.default.createElement("link", { rel: "apple-touch-icon-precomposed", href: "https://i.postimg.cc/FRsbCkJ1/192.jpg" }),
        children && children,
        react_1.default.createElement("title", null, title)));
};
exports.Head = Head;
