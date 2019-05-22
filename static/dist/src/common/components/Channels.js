"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const ChannelListItem_1 = tslib_1.__importDefault(require("./ChannelListItem"));
const ChannelListModalItem_1 = tslib_1.__importDefault(require("./ChannelListModalItem"));
const react_bootstrap_1 = require("react-bootstrap");
const actions = tslib_1.__importStar(require("../store/Chat/actions"));
const node_uuid_1 = tslib_1.__importDefault(require("node-uuid"));
class Channels extends react_1.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            addChannelModal: false,
            channelName: '',
            moreChannelsModal: false,
        };
    }
    handleChangeChannel(channel) {
        console.log('handle', channel);
        if (this.state.moreChannelsModal) {
            //  this.closeMoreChannelsModal();
        }
        this.props.onClick(channel);
    }
    openAddChannelModal(event) {
        event.preventDefault();
        this.setState({ addChannelModal: true });
    }
    closeAddChannelModal(event) {
        event.preventDefault();
        this.setState({ addChannelModal: false });
    }
    handleModalChange(event) {
        this.setState({ channelName: event.target.value });
    }
    handleModalSubmit(event) {
        const { channels, dispatch, socket } = this.props;
        event.preventDefault();
        console.log(event);
        if (this.state.channelName.length < 1) {
            this.refs.channelName.getInputDOMNode().focus();
        }
        if (this.state.channelName.length > 0 &&
            channels.filter(channel => {
                return channel.name === this.state.channelName.trim();
            }).length < 1) {
            const newChannel = {
                name: this.state.channelName.trim(),
                id: `${Date.now()}${node_uuid_1.default.v4()}`,
                private: false,
            };
            dispatch(actions.createChannel(newChannel));
            this.handleChangeChannel(newChannel);
            socket.emit('new channel', newChannel);
            this.setState({ channelName: '' });
            //   this.closeAddChannelModal(event);
        }
    }
    deleteChannel(channel) {
        const { channels, dispatch, socket } = this.props;
        dispatch(actions.deleteChannel(channel));
    }
    validateChannelName() {
        const { channels } = this.props;
        if (channels.filter(channel => {
            return channel.name === this.state.channelName.trim();
        }).length > 0) {
            return 'error';
        }
        return 'success';
    }
    openMoreChannelsModal(event) {
        event.preventDefault();
        this.setState({ moreChannelsModal: true });
    }
    closeMoreChannelsModal(event) {
        event.preventDefault();
        this.setState({ moreChannelsModal: false });
    }
    createChannelWithinModal() {
        this.closeMoreChannelsModal();
        this.openAddChannelModal();
    }
    render() {
        const { channels, idActive, messages, username } = this.props;
        const filteredChannels = channels.slice(0, 8);
        console.log('fil', filteredChannels);
        const moreChannelsBoolean = channels.length > 8;
        const restOfTheChannels = channels.slice(8);
        const newChannelModal = (react_1.default.createElement("div", null,
            react_1.default.createElement(react_bootstrap_1.Modal, { key: 1, show: this.state.addChannelModal, onHide: this.closeAddChannelModal },
                react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                    react_1.default.createElement(react_bootstrap_1.Modal.Title, null, "Add New Channel")),
                react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
                    react_1.default.createElement("form", { onSubmit: this.handleModalSubmit },
                        react_1.default.createElement(react_bootstrap_1.Input, { ref: "channelName", type: "text", help: this.validateChannelName() === 'error' &&
                                'A channel with that name already exists!', bsStyle: this.validateChannelName(), hasFeedback: true, name: "channelName", autoFocus: "true", placeholder: "Enter the channel name", value: this.state.channelName, onChange: this.handleModalChange }))),
                react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
                    react_1.default.createElement(react_bootstrap_1.Button, { onClick: this.closeAddChannelModal }, "Cancel"),
                    react_1.default.createElement(react_bootstrap_1.Button, { disabled: this.validateChannelName() === 'error' && 'true', onClick: this.handleModalSubmit, type: "submit" }, "Create Channel")))));
        const moreChannelsModal = (react_1.default.createElement("div", { style: { background: 'grey' } },
            react_1.default.createElement(react_bootstrap_1.Modal, { key: 2, show: this.state.moreChannelsModal, onHide: this.closeMoreChannelsModal },
                react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                    react_1.default.createElement(react_bootstrap_1.Modal.Title, null, "More Channels"),
                    react_1.default.createElement("a", { onClick: this.createChannelWithinModal, style: { cursor: 'pointer', color: '#85BBE9' } }, "Create a channel")),
                react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
                    react_1.default.createElement("ul", { className: "lists", style: {
                            height: 'auto',
                            margin: '0',
                            overflowY: 'auto',
                            padding: '0',
                        } }, restOfTheChannels.map((channel, index) => (react_1.default.createElement(ChannelListModalItem_1.default, { channel: channel, key: index, onClick: this.handleChangeChannel }))))),
                react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
                    react_1.default.createElement("button", { onClick: this.closeMoreChannelsModal }, "Cancel")))));
        return (react_1.default.createElement("section", null,
            react_1.default.createElement("div", null,
                react_1.default.createElement("span", { style: {
                        paddingLeft: '0.8em',
                        fontSize: '1.5em',
                        color: '#d1d1d1',
                    } }, "Channels:")),
            newChannelModal,
            react_1.default.createElement("div", null,
                react_1.default.createElement("ul", { className: "lists-ba", style: {
                        display: 'flex',
                        flexDirection: 'column',
                        listStyle: 'none',
                        margin: '0',
                        overflowY: 'auto',
                        padding: '0',
                    } }, filteredChannels.map((channel, index) => (react_1.default.createElement(ChannelListItem_1.default, { username: username, idActive: idActive, style: {
                        paddingLeft: '0.8em',
                        background: '#2E6DA4',
                        height: '0.7em',
                    }, messageCount: messages.filter(msg => {
                        return msg.channelID === channel.name;
                    }).length, channel: channel, key: index, ondelete: this.deleteChannel, onClick: this.handleChangeChannel })))),
                moreChannelsBoolean && (react_1.default.createElement("a", { onClick: this.openMoreChannelsModal, style: { cursor: 'pointer', color: '#85BBE9' } },
                    "+ ",
                    channels.length - 8,
                    " more...")),
                moreChannelsModal)));
    }
}
Channels.propTypes = {
    channels: prop_types_1.default.array.isRequired,
    onClick: prop_types_1.default.func.isRequired,
    messages: prop_types_1.default.array.isRequired,
    dispatch: prop_types_1.default.func.isRequired,
};
exports.default = Channels;
