import * as tslib_1 from "tslib";
import React from 'react';
import PropTypes from 'prop-types';
var MessageListItem = /** @class */ (function (_super) {
    tslib_1.__extends(MessageListItem, _super);
    function MessageListItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageListItem.prototype.handleClick = function (user) {
        this.props.handleClickOnUser(user);
    };
    MessageListItem.prototype.render = function () {
        var message = this.props.message;
        return (React.createElement("li", { className: "messItem" },
            React.createElement("span", null,
                React.createElement("b", { className: "userName", style: { color: '#66c' } },
                    React.createElement("button", { style: {
                            background: 'Transparent',
                            backgroundRepeat: 'noRepeat',
                            border: 'none',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            outline: 'none',
                        }, onClick: this.handleClick.bind(this, message.user) }, message.user.username)),
                React.createElement("i", { className: "messDate", style: { color: '#aad', opacity: '0.8' } }, message.time)),
            React.createElement("div", { className: "message", style: {
                    clear: 'both',
                    paddingTop: '0.1em',
                    marginTop: '-1px',
                    paddingBottom: '0.3em',
                } }, message.text)));
    };
    MessageListItem.propTypes = {
        message: PropTypes.object.isRequired,
    };
    return MessageListItem;
}(React.Component));
export default MessageListItem;
