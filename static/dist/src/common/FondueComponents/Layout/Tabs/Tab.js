"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const Tabs_css_1 = tslib_1.__importDefault(require("./Tabs.css"));
class Tab extends react_1.Component {
    constructor(props) {
        super(props);
        this.onClick = () => {
            const { label, onClick } = this.props;
            onClick(label);
        };
    }
    render() {
        const { onClick, activeTab, label } = this.props;
        const className = classnames_1.default(Tabs_css_1.default.tabListItem, { [Tabs_css_1.default.active]: activeTab === label });
        return (react_1.default.createElement("li", { className: className },
            react_1.default.createElement("button", { className: Tabs_css_1.default.tabButton, onClick: this.onClick }, label)));
    }
}
exports.default = Tab;
