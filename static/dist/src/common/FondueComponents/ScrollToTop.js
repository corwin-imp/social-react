import * as tslib_1 from "tslib";
import { Component } from 'react';
import { withRouter } from 'react-router';
var ScrollToTop = /** @class */ (function (_super) {
    tslib_1.__extends(ScrollToTop, _super);
    function ScrollToTop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScrollToTop.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    };
    ScrollToTop.prototype.render = function () {
        return this.props.children;
    };
    return ScrollToTop;
}(Component));
export default withRouter(ScrollToTop);
