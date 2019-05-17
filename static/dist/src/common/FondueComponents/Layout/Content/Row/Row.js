import React from 'react';
import classNames from 'classnames';
import styles from './Row.css';
function Row(_a) {
    var _b;
    var className = _a.className, children = _a.children, alignItems = _a.alignItems, justifyContent = _a.justifyContent;
    return (React.createElement("div", { className: classNames(styles.row, (_b = {},
            _b[styles["alignItems-" + alignItems]] = alignItems,
            _b[styles["justifyContent-" + justifyContent]] = justifyContent,
            _b), className) }, children));
}
export default Row;
