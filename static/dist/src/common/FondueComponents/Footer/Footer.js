import React from 'react';
import classNames from 'classnames';
import { GitHub } from '../FondueAssets/svg';
import { ContentPusher } from '../Layout';
import * as styles from './Footer.css';
var Footer = function (_a) {
    var className = _a.className;
    return (React.createElement("footer", { className: classNames(styles.footer, className) },
        React.createElement(ContentPusher, null,
            React.createElement("a", { href: "https://github.com/luangjokaj/react-fondue", target: "_blank" },
                React.createElement(GitHub, null)))));
};
export { Footer };
