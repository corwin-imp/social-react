import React from 'react';
import classNames from 'classnames';
import styles from './Heading.css';
export function makeHeading(h) {
    var defaultSizeStyle = styles["like-h" + h];
    return function (_a) {
        var _b;
        var size = _a.size, children = _a.children, propsCN = _a.className, bold = _a.bold;
        var sizeStyle = size ? styles[size] : defaultSizeStyle;
        var className = classNames(styles.heading, propsCN, sizeStyle, (_b = {},
            _b[styles.bold] = bold,
            _b));
        return React.createElement("h" + h, { className: className }, children);
    };
}
