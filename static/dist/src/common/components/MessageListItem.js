"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
class MessageListItem extends react_1.default.Component {
    handleClick(user) {
        this.props.handleClickOnUser(user);
    }
    render() {
        const { message } = this.props;
        return (react_1.default.createElement("li", { className: "messItem" },
            react_1.default.createElement("span", null,
                react_1.default.createElement("b", { className: "userName", style: { color: '#66c' } },
                    react_1.default.createElement("button", { style: {
                            background: 'Transparent',
                            backgroundRepeat: 'noRepeat',
                            border: 'none',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            outline: 'none',
                        }, onClick: this.handleClick.bind(this, message.user) }, message.user.username)),
                react_1.default.createElement("i", { className: "messDate", style: { color: '#aad', opacity: '0.8' } }, message.time)),
            react_1.default.createElement("div", { className: "message", style: {
                    clear: 'both',
                    paddingTop: '0.1em',
                    marginTop: '-1px',
                    paddingBottom: '0.3em',
                } }, message.text)));
    }
}
MessageListItem.propTypes = {
    message: prop_types_1.default.object.isRequired,
};
exports.default = MessageListItem;
