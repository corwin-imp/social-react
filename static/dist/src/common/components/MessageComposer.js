import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Input } from 'react-bootstrap';
import uuid from 'node-uuid';
var MessageComposer = /** @class */ (function (_super) {
    tslib_1.__extends(MessageComposer, _super);
    function MessageComposer(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            text: '',
            typing: false,
        };
        return _this;
    }
    MessageComposer.prototype.handleSubmit = function (event) {
        var _a = this.props, user = _a.user, socket = _a.socket, activeChannel = _a.activeChannel;
        var text = event.target.value.trim();
        if (event.which === 13) {
            event.preventDefault();
            var newMessage = {
                id: "" + Date.now() + uuid.v4(),
                channelID: this.props.activeChannel,
                text: text,
                user: user,
                time: moment.utc().format('lll'),
            };
            socket.emit('new message', newMessage);
            socket.emit('stop typing', {
                user: user.username,
                channel: activeChannel,
            });
            this.props.onSave(newMessage);
            this.setState({ text: '', typing: false });
        }
    };
    MessageComposer.prototype.handleChange = function (event) {
        var _a = this.props, socket = _a.socket, user = _a.user, activeChannel = _a.activeChannel;
        this.setState({ text: event.target.value });
        if (event.target.value.length > 0 && !this.state.typing) {
            socket.emit('typing', { user: user.username, channel: activeChannel });
            this.setState({ typing: true });
        }
        if (event.target.value.length === 0 && this.state.typing) {
            socket.emit('stop typing', {
                user: user.username,
                channel: activeChannel,
            });
            this.setState({ typing: false });
        }
    };
    MessageComposer.prototype.render = function () {
        return (React.createElement("div", { className: "messComposer" },
            React.createElement(Input, { className: "areaMessage", type: "textarea", name: "message", ref: "messageComposer", autoFocus: "true", placeholder: "Type here to chat!", value: this.state.text, onChange: this.handleChange, onKeyDown: this.handleSubmit })));
    };
    MessageComposer.propTypes = {
        activeChannel: PropTypes.string.isRequired,
        onSave: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        socket: PropTypes.object.isRequired,
    };
    return MessageComposer;
}(Component));
export default MessageComposer;
