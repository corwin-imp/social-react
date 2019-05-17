import React from 'react';
import classNames from 'classnames';
import styles from './ContentPusher.css';
import AppearAfter from '../../AppearAfter';
var ContentPusher = function (_a) {
    var className = _a.className, children = _a.children;
    return (React.createElement(AppearAfter, { className: classNames(styles.contentPusher, className), visibleClassName: styles.visible, delay: 600 },
        React.createElement("div", null, children)));
};
export default ContentPusher;
