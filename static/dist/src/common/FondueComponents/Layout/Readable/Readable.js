import React from 'react';
import classNames from 'classnames';
import styles from './Readable.css';
var Readable = function (_a) {
    var className = _a.className, children = _a.children;
    return React.createElement("div", { className: classNames(styles.readable, className) }, children);
};
export default Readable;
