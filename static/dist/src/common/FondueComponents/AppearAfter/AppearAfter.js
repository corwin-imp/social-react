"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
class AppearAfter extends react_1.Component {
    componentDidMount() {
        setTimeout(() => this.setState({ isVisible: true }), this.props.delay || 0);
    }
    constructor(props) {
        super(props);
        this.state = { isVisible: false };
    }
    render() {
        const { isVisible } = this.state;
        const { children, className, visibleClassName } = this.props;
        return react_1.default.cloneElement(children, {
            className: classnames_1.default(className, {
                [visibleClassName]: isVisible,
                hidden: !isVisible,
            }),
        });
    }
}
exports.default = AppearAfter;
