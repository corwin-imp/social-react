"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_bootstrap_1 = require("react-bootstrap");
const node_uuid_1 = tslib_1.__importDefault(require("node-uuid"));
class MessageComposer extends react_1.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            text: '',
            typing: false,
        };
    }
    handleSubmit(event) {
        const { user, socket, activeChannel } = this.props;
        const text = event.target.value.trim();
        if (event.which === 13) {
            event.preventDefault();
            var newMessage = {
                id: `${Date.now()}${node_uuid_1.default.v4()}`,
                channelID: this.props.activeChannel,
                text: text,
                user: user,
                time: moment_1.default.utc().format('lll'),
            };
            socket.emit('new message', newMessage);
            socket.emit('stop typing', {
                user: user.username,
                channel: activeChannel,
            });
            this.props.onSave(newMessage);
            this.setState({ text: '', typing: false });
        }
    }
    handleChange(event) {
        const { socket, user, activeChannel } = this.props;
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
    }
    render() {
        return (react_1.default.createElement("div", { className: "messComposer" },
            react_1.default.createElement(react_bootstrap_1.Input, { className: "areaMessage", type: "textarea", name: "message", ref: "messageComposer", autoFocus: "true", placeholder: "Type here to chat!", value: this.state.text, onChange: this.handleChange, onKeyDown: this.handleSubmit })));
    }
}
MessageComposer.propTypes = {
    activeChannel: prop_types_1.default.string.isRequired,
    onSave: prop_types_1.default.func.isRequired,
    user: prop_types_1.default.object.isRequired,
    socket: prop_types_1.default.object.isRequired,
};
exports.default = MessageComposer;
