"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const Tabs_css_1 = tslib_1.__importDefault(require("./Tabs.css"));
const Tab_1 = tslib_1.__importDefault(require("./Tab"));
const highlight_1 = tslib_1.__importDefault(require("highlight.js/lib/highlight"));
const javascript_1 = tslib_1.__importDefault(require("highlight.js/lib/languages/javascript"));
const css_1 = tslib_1.__importDefault(require("highlight.js/lib/languages/css"));
highlight_1.default.registerLanguage('javascript', javascript_1.default);
highlight_1.default.registerLanguage('css', css_1.default);
class Tabs extends react_1.Component {
    constructor(props) {
        super(props);
        this.onClickTabItem = tab => {
            this.setState({ activeTab: tab });
        };
        this.state = {
            activeTab: this.props.children[0].props.label,
        };
    }
    componentDidUpdate() {
        const cdx = document.getElementsByTagName('pre');
        if (cdx.length) {
            let i;
            for (i = 0; i < cdx.length; i++) {
                highlight_1.default.highlightBlock(cdx[i]);
            }
        }
    }
    render() {
        const { onClickTabItem, children, className, wrap, classNameTabList, classNameTabContent, } = this.props;
        const { activeTab } = this.state;
        return (react_1.default.createElement("div", { className: classnames_1.default(Tabs_css_1.default.tabsWrapper, className, { [Tabs_css_1.default.wrap]: wrap }) },
            react_1.default.createElement("ol", { className: classnames_1.default(Tabs_css_1.default.tabList, classNameTabList) }, children.map(child => {
                const { label } = child.props;
                return (react_1.default.createElement(Tab_1.default, { activeTab: activeTab, key: label, label: label, onClick: this.onClickTabItem }));
            })),
            react_1.default.createElement("div", { className: classnames_1.default(Tabs_css_1.default.tabContent, classNameTabContent) }, children.map(child => {
                if (child.props.label !== activeTab) {
                    return undefined;
                }
                return child.props.children;
            }))));
    }
}
exports.default = Tabs;
