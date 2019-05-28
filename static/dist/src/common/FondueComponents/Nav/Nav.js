"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const AppearAfter_1 = tslib_1.__importDefault(require("../AppearAfter"));
const react_router_dom_1 = require("react-router-dom");
const Nav_css_1 = tslib_1.__importDefault(require("./Nav.css"));
const NavItem_1 = require("./NavItem");
const svg_1 = require("../FondueAssets/svg");
class Nav extends react_1.Component {
    constructor(props) {
        super(props);
        this.toggleMenu = () => {
            this.setState({ menu: !this.state.menu });
        };
        this.closeMenu = () => {
            this.setState({ menu: false });
        };
        this.state = {
            menu: false,
        };
    }
    render() {
        const { menu } = this.state;
        const { location, lang } = this.props;
        return (react_1.default.createElement(AppearAfter_1.default, { className: Nav_css_1.default.navigation, visibleClassName: Nav_css_1.default.visible },
            react_1.default.createElement("header", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: `/${lang}`, className: Nav_css_1.default.logo },
                    react_1.default.createElement(svg_1.Logo, null),
                    react_1.default.createElement("h1", null, "ReactFondue - Minimal boilerplate with code splitting, hot module reload and server side rendering")),
                react_1.default.createElement("button", { onClick: this.toggleMenu, className: classnames_1.default(Nav_css_1.default.burger, {
                        [Nav_css_1.default.active]: menu,
                    }) },
                    react_1.default.createElement("span", null)),
                react_1.default.createElement("ul", { className: classnames_1.default(Nav_css_1.default.list, {
                        [Nav_css_1.default.active]: menu,
                    }) },
                    react_1.default.createElement(NavItem_1.NavItem, { title: "Overview", link: "/", active: location.pathname == `/${lang}` ? true : false },
                        react_1.default.createElement("ul", { className: Nav_css_1.default.sub },
                            react_1.default.createElement("li", null,
                                react_1.default.createElement(react_router_dom_1.NavLink, { to: `/${lang}`, activeClassName: Nav_css_1.default.active, onClick: this.closeMenu, exact: true }, "Introduction")))),
                    react_1.default.createElement(NavItem_1.NavItem, { title: "About", link: "/", active: location.pathname == `/${lang}/about` || location.pathname == `/${lang}/about/`
                            ? true
                            : false, label: "New" },
                        react_1.default.createElement("ul", { className: Nav_css_1.default.sub },
                            react_1.default.createElement("li", null,
                                react_1.default.createElement(react_router_dom_1.NavLink, { to: `/${lang}/about`, activeClassName: Nav_css_1.default.active, onClick: this.closeMenu, exact: true }, "ReactFondue"))))),
                react_1.default.createElement("ul", { className: Nav_css_1.default.poweredBy },
                    react_1.default.createElement("li", null,
                        react_1.default.createElement("a", { href: "https://www.riangle.com/", target: "_blank" },
                            react_1.default.createElement(svg_1.Riangle, null)))))));
    }
}
exports.default = react_router_dom_1.withRouter(Nav);
