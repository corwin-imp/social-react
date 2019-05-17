import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import classNames from 'classnames';
var AppearAfter = /** @class */ (function (_super) {
    tslib_1.__extends(AppearAfter, _super);
    function AppearAfter(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { isVisible: false };
        return _this;
    }
    AppearAfter.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () { return _this.setState({ isVisible: true }); }, this.props.delay || 0);
    };
    AppearAfter.prototype.render = function () {
        var _a;
        var isVisible = this.state.isVisible;
        var _b = this.props, children = _b.children, className = _b.className, visibleClassName = _b.visibleClassName;
        return React.cloneElement(children, {
            className: classNames(className, (_a = {},
                _a[visibleClassName] = isVisible,
                _a.hidden = !isVisible,
                _a)),
        });
    };
    return AppearAfter;
}(Component));
export default AppearAfter;
