import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './Tabs.css';
var Tab = /** @class */ (function (_super) {
    tslib_1.__extends(Tab, _super);
    function Tab(props) {
        var _this = _super.call(this, props) || this;
        _this.onClick = function () {
            var _a = _this.props, label = _a.label, onClick = _a.onClick;
            onClick(label);
        };
        return _this;
    }
    Tab.prototype.render = function () {
        var _a;
        var _b = this.props, onClick = _b.onClick, activeTab = _b.activeTab, label = _b.label;
        var className = classNames(styles.tabListItem, (_a = {}, _a[styles.active] = activeTab === label, _a));
        return (React.createElement("li", { className: className },
            React.createElement("button", { className: styles.tabButton, onClick: this.onClick }, label)));
    };
    return Tab;
}(Component));
export default Tab;
