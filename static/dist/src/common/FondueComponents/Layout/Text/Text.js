import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import classNames from 'classnames';
import { Quote } from '../../FondueAssets/svg';
import styles from './Text.css';
var Text = /** @class */ (function (_super) {
    tslib_1.__extends(Text, _super);
    function Text() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Text.prototype.render = function () {
        var _a;
        var _b = this.props, children = _b.children, className = _b.className, textAlign = _b.textAlign, eyebrow = _b.eyebrow, subtitle = _b.subtitle, small = _b.small, blockquote = _b.blockquote;
        var ownClassName = classNames((_a = {},
            _a[styles.eyebrow] = eyebrow,
            _a[styles.subtitle] = subtitle,
            _a[styles.textLeft] = textAlign === 'left',
            _a[styles.textCenter] = textAlign === 'center',
            _a[styles.textRight] = textAlign === 'right',
            _a[styles.small] = small,
            _a[styles.blockquote] = blockquote,
            _a), styles.text);
        if (small) {
            return React.createElement("small", { className: ownClassName }, children);
        }
        if (blockquote) {
            return (React.createElement("blockquote", { className: ownClassName },
                React.createElement("span", { className: classNames(styles.quoteIcon, styles.first) },
                    React.createElement(Quote, null),
                    React.createElement(Quote, null)),
                children,
                React.createElement("span", { className: classNames(styles.quoteIcon, styles.last) },
                    React.createElement(Quote, null),
                    React.createElement(Quote, null))));
        }
        return React.createElement("div", { className: ownClassName }, children);
    };
    return Text;
}(Component));
export default Text;
