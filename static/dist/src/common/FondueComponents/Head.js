import React from 'react';
import { Helmet } from 'react-helmet';
var isProd = process.env.NODE_ENV === 'production';
var Head = function (_a) {
    var _b = _a.title, title = _b === void 0 ? 'ReactFondue • Minimal boilerplate with code splitting, hot module reload and server side rendering' : _b, _c = _a.description, description = _c === void 0 ? 'ReactFondue is minimal React boilerplate with support for code splitting, hot module reload and server side rendering.' : _c, _d = _a.image, image = _d === void 0 ? 'https://i.postimg.cc/543n5bF6/preview.jpg' : _d, children = _a.children;
    return (React.createElement(Helmet, { encodeSpecialCharacters: true },
        React.createElement("meta", { "http-equiv": "", content: "IE=edge" }),
        React.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
        React.createElement("meta", { name: "description", content: description }),
        React.createElement("meta", { property: "og:title", content: title }),
        React.createElement("meta", { property: "og:description", content: description }),
        React.createElement("meta", { property: "og:image", content: image }),
        React.createElement("link", { rel: "icon", sizes: "192x192", href: "https://i.postimg.cc/FRsbCkJ1/192.jpg" }),
        React.createElement("link", { rel: "apple-touch-icon-precomposed", href: "https://i.postimg.cc/FRsbCkJ1/192.jpg" }),
        children && children,
        React.createElement("title", null, title)));
};
export { Head };
