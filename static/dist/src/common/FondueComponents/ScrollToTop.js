"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_1 = require("react-router");
class ScrollToTop extends react_1.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }
    render() {
        return this.props.children;
    }
}
exports.default = react_router_1.withRouter(ScrollToTop);
