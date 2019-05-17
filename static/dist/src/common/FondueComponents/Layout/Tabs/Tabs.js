import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './Tabs.css';
import Tab from './Tab';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
var Tabs = /** @class */ (function (_super) {
    tslib_1.__extends(Tabs, _super);
    function Tabs(props) {
        var _this = _super.call(this, props) || this;
        _this.onClickTabItem = function (tab) {
            _this.setState({ activeTab: tab });
        };
        _this.state = {
            activeTab: _this.props.children[0].props.label,
        };
        return _this;
    }
    Tabs.prototype.componentDidUpdate = function () {
        var cdx = document.getElementsByTagName('pre');
        if (cdx.length) {
            var i = void 0;
            for (i = 0; i < cdx.length; i++) {
                hljs.highlightBlock(cdx[i]);
            }
        }
    };
    Tabs.prototype.render = function () {
        var _this = this;
        var _a;
        var _b = this.props, onClickTabItem = _b.onClickTabItem, children = _b.children, className = _b.className, wrap = _b.wrap, classNameTabList = _b.classNameTabList, classNameTabContent = _b.classNameTabContent;
        var activeTab = this.state.activeTab;
        return (React.createElement("div", { className: classNames(styles.tabsWrapper, className, (_a = {}, _a[styles.wrap] = wrap, _a)) },
            React.createElement("ol", { className: classNames(styles.tabList, classNameTabList) }, children.map(function (child) {
                var label = child.props.label;
                return (React.createElement(Tab, { activeTab: activeTab, key: label, label: label, onClick: _this.onClickTabItem }));
            })),
            React.createElement("div", { className: classNames(styles.tabContent, classNameTabContent) }, children.map(function (child) {
                if (child.props.label !== activeTab) {
                    return undefined;
                }
                return child.props.children;
            }))));
    };
    return Tabs;
}(Component));
export default Tabs;
