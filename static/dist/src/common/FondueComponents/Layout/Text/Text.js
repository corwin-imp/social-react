"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const svg_1 = require("../../FondueAssets/svg");
const Text_css_1 = tslib_1.__importDefault(require("./Text.css"));
class Text extends react_1.Component {
    render() {
        const { children, className, textAlign, eyebrow, subtitle, small, blockquote } = this.props;
        const ownClassName = classnames_1.default({
            [Text_css_1.default.eyebrow]: eyebrow,
            [Text_css_1.default.subtitle]: subtitle,
            [Text_css_1.default.textLeft]: textAlign === 'left',
            [Text_css_1.default.textCenter]: textAlign === 'center',
            [Text_css_1.default.textRight]: textAlign === 'right',
            [Text_css_1.default.small]: small,
            [Text_css_1.default.blockquote]: blockquote,
        }, Text_css_1.default.text);
        if (small) {
            return react_1.default.createElement("small", { className: ownClassName }, children);
        }
        if (blockquote) {
            return (react_1.default.createElement("blockquote", { className: ownClassName },
                react_1.default.createElement("span", { className: classnames_1.default(Text_css_1.default.quoteIcon, Text_css_1.default.first) },
                    react_1.default.createElement(svg_1.Quote, null),
                    react_1.default.createElement(svg_1.Quote, null)),
                children,
                react_1.default.createElement("span", { className: classnames_1.default(Text_css_1.default.quoteIcon, Text_css_1.default.last) },
                    react_1.default.createElement(svg_1.Quote, null),
                    react_1.default.createElement(svg_1.Quote, null))));
        }
        return react_1.default.createElement("div", { className: ownClassName }, children);
    }
}
exports.default = Text;
