import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import classNames from 'classnames';
import { Arrow } from '../FondueAssets/svg';
import styles from './Nav.css';
var NavItem = /** @class */ (function (_super) {
    tslib_1.__extends(NavItem, _super);
    function NavItem(props) {
        var _this = _super.call(this, props) || this;
        _this.toggleAccordion = function () {
            _this.setState({ opened: !_this.state.opened });
        };
        _this.state = {
            opened: props.active ? true : false,
        };
        return _this;
    }
    NavItem.prototype.render = function () {
        var _a;
        var opened = this.state.opened;
        var _b = this.props, children = _b.children, title = _b.title, className = _b.className, link = _b.link, label = _b.label;
        var x = {
            to: link,
            onClick: children ? this.toggleAccordion : undefined,
            className: styles.link
        };
        return (React.createElement("li", { className: classNames(styles.navItem, className, (_a = {},
                _a[styles.opened] = opened,
                _a)) },
            React.createElement("button", tslib_1.__assign({}, x),
                title,
                " ",
                label && React.createElement("span", { className: styles.label }, label),
                React.createElement(Arrow, { className: styles.arrow })),
            children && children));
    };
    return NavItem;
}(Component));
export { NavItem };
