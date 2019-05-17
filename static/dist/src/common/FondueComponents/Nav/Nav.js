import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import classNames from 'classnames';
import AppearAfter from '../AppearAfter';
import { Link, NavLink, withRouter } from 'react-router-dom';
import styles from './Nav.css';
import { NavItem } from './NavItem';
import { Logo, Riangle } from '../FondueAssets/svg';
var Nav = /** @class */ (function (_super) {
    tslib_1.__extends(Nav, _super);
    function Nav(props) {
        var _this = _super.call(this, props) || this;
        _this.toggleMenu = function () {
            _this.setState({ menu: !_this.state.menu });
        };
        _this.closeMenu = function () {
            _this.setState({ menu: false });
        };
        _this.state = {
            menu: false,
        };
        return _this;
    }
    Nav.prototype.render = function () {
        var _a, _b;
        var menu = this.state.menu;
        var _c = this.props, location = _c.location, lang = _c.lang;
        return (React.createElement(AppearAfter, { className: styles.navigation, visibleClassName: styles.visible },
            React.createElement("header", null,
                React.createElement(Link, { to: "/" + lang, className: styles.logo },
                    React.createElement(Logo, null),
                    React.createElement("h1", null, "ReactFondue - Minimal boilerplate with code splitting, hot module reload and server side rendering")),
                React.createElement("button", { onClick: this.toggleMenu, className: classNames(styles.burger, (_a = {},
                        _a[styles.active] = menu,
                        _a)) },
                    React.createElement("span", null)),
                React.createElement("ul", { className: classNames(styles.list, (_b = {},
                        _b[styles.active] = menu,
                        _b)) },
                    React.createElement(NavItem, { title: "Overview", link: "/", active: location.pathname == "/" + lang ? true : false },
                        React.createElement("ul", { className: styles.sub },
                            React.createElement("li", null,
                                React.createElement(NavLink, { to: "/" + lang, activeClassName: styles.active, onClick: this.closeMenu, exact: true }, "Introduction")))),
                    React.createElement(NavItem, { title: "About", link: "/", active: location.pathname == "/" + lang + "/about" || location.pathname == "/" + lang + "/about/"
                            ? true
                            : false, label: "New" },
                        React.createElement("ul", { className: styles.sub },
                            React.createElement("li", null,
                                React.createElement(NavLink, { to: "/" + lang + "/about", activeClassName: styles.active, onClick: this.closeMenu, exact: true }, "ReactFondue"))))),
                React.createElement("ul", { className: styles.poweredBy },
                    React.createElement("li", null,
                        React.createElement("a", { href: "https://www.riangle.com/", target: "_blank" },
                            React.createElement(Riangle, null)))))));
    };
    return Nav;
}(Component));
export default withRouter(Nav);
