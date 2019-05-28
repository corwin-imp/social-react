"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const svg_1 = require("../FondueAssets/svg");
const Nav_css_1 = tslib_1.__importDefault(require("./Nav.css"));
class NavItem extends react_1.Component {
    constructor(props) {
        super(props);
        this.toggleAccordion = () => {
            this.setState({ opened: !this.state.opened });
        };
        this.state = {
            opened: props.active ? true : false,
        };
    }
    render() {
        const { opened } = this.state;
        const { children, title, className, link, label } = this.props;
        const x = {
            to: link,
            onClick: children ? this.toggleAccordion : undefined,
            className: Nav_css_1.default.link
        };
        return (react_1.default.createElement("li", { className: classnames_1.default(Nav_css_1.default.navItem, className, {
                [Nav_css_1.default.opened]: opened,
            }) },
            react_1.default.createElement("button", Object.assign({}, x),
                title,
                " ",
                label && react_1.default.createElement("span", { className: Nav_css_1.default.label }, label),
                react_1.default.createElement(svg_1.Arrow, { className: Nav_css_1.default.arrow })),
            children && children));
    }
}
exports.NavItem = NavItem;
