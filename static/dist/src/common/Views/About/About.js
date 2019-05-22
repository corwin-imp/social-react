"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const Head_1 = require("../../FondueComponents/Head");
const Layout_1 = require("../../FondueComponents/Layout");
const dataEn = require('./data-about-en.md');
const dataDe = require('./data-about-de.md');
const highlight_1 = tslib_1.__importDefault(require("highlight.js/lib/highlight"));
const javascript_1 = tslib_1.__importDefault(require("highlight.js/lib/languages/javascript"));
const css_1 = tslib_1.__importDefault(require("highlight.js/lib/languages/css"));
highlight_1.default.registerLanguage('javascript', javascript_1.default);
highlight_1.default.registerLanguage('css', css_1.default);
class About extends react_1.Component {
    componentDidMount() {
        const cdx = document.getElementsByTagName('pre');
        if (cdx.length) {
            let i;
            for (i = 0; i < cdx.length; i++) {
                highlight_1.default.highlightBlock(cdx[i]);
            }
        }
    }
    render() {
        const { lang } = this.props.match.params;
        return (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(Head_1.Head, { title: "ReactFondue \u2022 About" }),
            react_1.default.createElement(Layout_1.ContentPusher, null,
                react_1.default.createElement(Layout_1.Container, null,
                    react_1.default.createElement(Layout_1.Readable, null,
                        lang === 'en' && (react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: dataEn.__content } })),
                        lang === 'de' && (react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: dataDe.__content } })))))));
    }
}
exports.default = About;
