import React from 'react';
import classNames from 'classnames';
import styles from './Button.css';
function Button(_a) {
    var className = _a.className, id = _a.id, children = _a.children, onClick = _a.onClick, href = _a.href, target = _a.target;
    if (href) {
        return (React.createElement("a", { href: href, target: target, className: classNames(styles.button, className), id: id }, children));
    }
    return (React.createElement("button", { onClick: onClick, className: classNames(styles.button, className), id: id }, children));
}
export default Button;
