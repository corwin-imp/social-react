import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChannelListItem from './ChannelListItem';
import ChannelListModalItem from './ChannelListModalItem';
import { Modal, Input, Button } from 'react-bootstrap';
import * as actions from '../store/Chat/actions';
import uuid from 'node-uuid';
var Channels = /** @class */ (function (_super) {
    tslib_1.__extends(Channels, _super);
    function Channels(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            addChannelModal: false,
            channelName: '',
            moreChannelsModal: false,
        };
        return _this;
    }
    Channels.prototype.handleChangeChannel = function (channel) {
        console.log('handle', channel);
        if (this.state.moreChannelsModal) {
            //  this.closeMoreChannelsModal();
        }
        this.props.onClick(channel);
    };
    Channels.prototype.openAddChannelModal = function (event) {
        event.preventDefault();
        this.setState({ addChannelModal: true });
    };
    Channels.prototype.closeAddChannelModal = function (event) {
        event.preventDefault();
        this.setState({ addChannelModal: false });
    };
    Channels.prototype.handleModalChange = function (event) {
        this.setState({ channelName: event.target.value });
    };
    Channels.prototype.handleModalSubmit = function (event) {
        var _this = this;
        var _a = this.props, channels = _a.channels, dispatch = _a.dispatch, socket = _a.socket;
        event.preventDefault();
        console.log(event);
        if (this.state.channelName.length < 1) {
            this.refs.channelName.getInputDOMNode().focus();
        }
        if (this.state.channelName.length > 0 &&
            channels.filter(function (channel) {
                return channel.name === _this.state.channelName.trim();
            }).length < 1) {
            var newChannel = {
                name: this.state.channelName.trim(),
                id: "" + Date.now() + uuid.v4(),
                private: false,
            };
            dispatch(actions.createChannel(newChannel));
            this.handleChangeChannel(newChannel);
            socket.emit('new channel', newChannel);
            this.setState({ channelName: '' });
            //   this.closeAddChannelModal(event);
        }
    };
    Channels.prototype.deleteChannel = function (channel) {
        var _a = this.props, channels = _a.channels, dispatch = _a.dispatch, socket = _a.socket;
        dispatch(actions.deleteChannel(channel));
    };
    Channels.prototype.validateChannelName = function () {
        var _this = this;
        var channels = this.props.channels;
        if (channels.filter(function (channel) {
            return channel.name === _this.state.channelName.trim();
        }).length > 0) {
            return 'error';
        }
        return 'success';
    };
    Channels.prototype.openMoreChannelsModal = function (event) {
        event.preventDefault();
        this.setState({ moreChannelsModal: true });
    };
    Channels.prototype.closeMoreChannelsModal = function (event) {
        event.preventDefault();
        this.setState({ moreChannelsModal: false });
    };
    Channels.prototype.createChannelWithinModal = function () {
        this.closeMoreChannelsModal();
        this.openAddChannelModal();
    };
    Channels.prototype.render = function () {
        var _this = this;
        var _a = this.props, channels = _a.channels, idActive = _a.idActive, messages = _a.messages, username = _a.username;
        var filteredChannels = channels.slice(0, 8);
        console.log('fil', filteredChannels);
        var moreChannelsBoolean = channels.length > 8;
        var restOfTheChannels = channels.slice(8);
        var newChannelModal = (React.createElement("div", null,
            React.createElement(Modal, { key: 1, show: this.state.addChannelModal, onHide: this.closeAddChannelModal },
                React.createElement(Modal.Header, { closeButton: true },
                    React.createElement(Modal.Title, null, "Add New Channel")),
                React.createElement(Modal.Body, null,
                    React.createElement("form", { onSubmit: this.handleModalSubmit },
                        React.createElement(Input, { ref: "channelName", type: "text", help: this.validateChannelName() === 'error' &&
                                'A channel with that name already exists!', bsStyle: this.validateChannelName(), hasFeedback: true, name: "channelName", autoFocus: "true", placeholder: "Enter the channel name", value: this.state.channelName, onChange: this.handleModalChange }))),
                React.createElement(Modal.Footer, null,
                    React.createElement(Button, { onClick: this.closeAddChannelModal }, "Cancel"),
                    React.createElement(Button, { disabled: this.validateChannelName() === 'error' && 'true', onClick: this.handleModalSubmit, type: "submit" }, "Create Channel")))));
        var moreChannelsModal = (React.createElement("div", { style: { background: 'grey' } },
            React.createElement(Modal, { key: 2, show: this.state.moreChannelsModal, onHide: this.closeMoreChannelsModal },
                React.createElement(Modal.Header, { closeButton: true },
                    React.createElement(Modal.Title, null, "More Channels"),
                    React.createElement("a", { onClick: this.createChannelWithinModal, style: { cursor: 'pointer', color: '#85BBE9' } }, "Create a channel")),
                React.createElement(Modal.Body, null,
                    React.createElement("ul", { className: "lists", style: {
                            height: 'auto',
                            margin: '0',
                            overflowY: 'auto',
                            padding: '0',
                        } }, restOfTheChannels.map(function (channel, index) { return (React.createElement(ChannelListModalItem, { channel: channel, key: index, onClick: _this.handleChangeChannel })); }))),
                React.createElement(Modal.Footer, null,
                    React.createElement("button", { onClick: this.closeMoreChannelsModal }, "Cancel")))));
        return (React.createElement("section", null,
            React.createElement("div", null,
                React.createElement("span", { style: {
                        paddingLeft: '0.8em',
                        fontSize: '1.5em',
                        color: '#d1d1d1',
                    } }, "Channels:")),
            newChannelModal,
            React.createElement("div", null,
                React.createElement("ul", { className: "lists-ba", style: {
                        display: 'flex',
                        flexDirection: 'column',
                        listStyle: 'none',
                        margin: '0',
                        overflowY: 'auto',
                        padding: '0',
                    } }, filteredChannels.map(function (channel, index) { return (React.createElement(ChannelListItem, { username: username, idActive: idActive, style: {
                        paddingLeft: '0.8em',
                        background: '#2E6DA4',
                        height: '0.7em',
                    }, messageCount: messages.filter(function (msg) {
                        return msg.channelID === channel.name;
                    }).length, channel: channel, key: index, ondelete: _this.deleteChannel, onClick: _this.handleChangeChannel })); })),
                moreChannelsBoolean && (React.createElement("a", { onClick: this.openMoreChannelsModal, style: { cursor: 'pointer', color: '#85BBE9' } },
                    "+ ",
                    channels.length - 8,
                    " more...")),
                moreChannelsModal)));
    };
    Channels.propTypes = {
        channels: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired,
        messages: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired,
    };
    return Channels;
}(Component));
export default Channels;
