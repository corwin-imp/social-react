import React from 'react';
import classNames from 'classnames';
import styles from './Container.css';
var Container = function (_a) {
    var _b;
    var className = _a.className, children = _a.children, _c = _a.fluid, fluid = _c === void 0 ? false : _c;
    return (React.createElement("div", { className: classNames(styles.container, (_b = {},
            _b[styles.containerFluid] = fluid,
            _b), className) }, children));
};
export default Container;
