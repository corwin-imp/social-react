import React from 'react';
import classNames from 'classnames';
import styles from './Content.css';
function Content(_a) {
    var className = _a.className, children = _a.children;
    return React.createElement("div", { className: classNames(styles.content, className) }, children);
}
export default Content;
