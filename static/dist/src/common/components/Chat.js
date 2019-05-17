import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItem';
import Channels from './Channels';
import ItemsList from './ItemsList';
import FontAwesome from 'react-fontawesome';
import * as actions from '../store/Chat/actions';
import * as authActions from '../store/Auth/actionsAuth';
import TypingListItem from './TypingListItem';
import uuid from 'node-uuid';
import { Modal, DropdownButton, MenuItem, Button, Input, Navbar, } from 'react-bootstrap';
var Chat = /** @class */ (function (_super) {
    tslib_1.__extends(Chat, _super);
    function Chat(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            privateChannelModal: false,
            targetedUser: '',
            findUser: '',
            selectItem: [],
            find: true,
        };
        return _this;
    }
    Chat.prototype.componentDidMount = function () {
        var _a = this.props, socket = _a.socket, user = _a.user, dispatch = _a.dispatch, channels = _a.channels;
        if (!channels.length && user.id) {
            dispatch(actions.fetchMyChannels(user.channels));
        }
        socket.emit('chat mounted', user);
        socket.on('new bc message', function (msg) { return dispatch(actions.receiveRawMessage(msg)); });
        socket.on('typing bc', function (user) { return dispatch(actions.typing(user)); });
        socket.on('stop typing bc', function (user) { return dispatch(actions.stopTyping(user)); });
        socket.on('new channel', function (channel) {
            return dispatch(actions.receiveRawChannel(channel));
        });
        socket.on('receive socket', function (socketID) {
            dispatch(authActions.receiveSocket(socketID));
        });
        socket.on('receive private channel', function (channel) {
            return dispatch(actions.receiveRawChannel(channel));
        });
    };
    Chat.prototype.componentDidUpdate = function () {
        var messageList = this.refs.messageList;
        messageList.scrollTop = messageList.scrollHeight;
    };
    Chat.prototype.handleChange = function (event) {
        this.setState({ findUser: event.target.value });
    };
    Chat.prototype.selectItem = function (event, data) {
        event.preventDefault();
        var item = this.state.selectItem;
        item[data.dataId] = data.name;
        this.setState({
            selectItem: item,
        });
        event.currentTarget.classList.toggle('itemSelect');
    };
    Chat.prototype.createChannel = function (event) {
        var _a = this.props, dispatch = _a.dispatch, channels = _a.channels, socket = _a.socket, user = _a.user;
        event.preventDefault();
        /*   if (this.state.selectItem.length > 0 && channels.filter(channel => {
                    return channel.between === this.state.selectItem;
                }).length < 1) {
    
            }*/
        var arrChannels = this.state.selectItem;
        var ids = Object.keys(arrChannels);
        var names = Object.values(arrChannels);
        ids.push(user.id);
        names.push(user.name);
        names = names.join(',');
        for (var chan in channels) {
            if (duplicat(ids, channels[chan]['between'])) {
                console.log('dubl ', ids, channels[chan]['between']);
                this.setState({
                    find: true,
                    selectItem: [],
                });
                alert('channel exists!');
                return false;
            }
        }
        var newChannel = {
            //  name: `channel  ${channels.length + 1 }`,
            name: names,
            id: "" + Date.now() + uuid.v4(),
            private: false,
            between: ids,
        };
        dispatch(actions.createChannel(newChannel));
        this.changeActiveChannel(newChannel);
        this.setState({
            find: true,
            selectItem: [],
        });
        socket.emit('new channel', newChannel);
    };
    Chat.prototype.onFocus = function (event) {
        if (event.currentTarget.classList == 'form-control') {
            this.setState({ find: false });
        }
    };
    Chat.prototype.onClFind = function (event) {
        console.log('onClFind-------------------------------');
        this.setState({ find: true });
    };
    Chat.prototype.handleSave = function (newMessage) {
        var dispatch = this.props.dispatch;
        if (newMessage.text.length !== 0) {
            dispatch(actions.createMessage(newMessage));
        }
    };
    Chat.prototype.handleSignOut = function () {
        var dispatch = this.props.dispatch;
        dispatch(authActions.signOut());
    };
    Chat.prototype.changeActiveChannel = function (channel) {
        var _a = this.props, socket = _a.socket, activeChannel = _a.activeChannel, dispatch = _a.dispatch;
        socket.emit('leave channel', activeChannel);
        socket.emit('join channel', channel);
        dispatch(actions.changeChannel(channel));
        dispatch(actions.fetchMessages(channel.name));
    };
    Chat.prototype.handleClickOnUser = function (user) {
        this.setState({ privateChannelModal: true, targetedUser: user });
    };
    Chat.prototype.closePrivateChannelModal = function (event) {
        event.preventDefault();
        this.setState({ privateChannelModal: false });
    };
    Chat.prototype.handleSendDirectMessage = function () {
        var _this = this;
        var _a = this.props, dispatch = _a.dispatch, socket = _a.socket, channels = _a.channels, user = _a.user;
        var doesPrivateChannelExist = channels.filter(function (item) {
            return (item.name ===
                (_this.state.targetedUser.username + "+" + user.username ||
                    user.username + "+" + _this.state.targetedUser.username));
        });
        if (user.username !== this.state.targetedUser.username &&
            doesPrivateChannelExist.length === 0) {
            var newChannel = {
                name: this.state.targetedUser.username + "+" + user.username,
                id: Date.now(),
                private: true,
                between: [this.state.targetedUser.username, user.username],
            };
            dispatch(actions.createChannel(newChannel));
            this.changeActiveChannel(newChannel);
            socket.emit('new private channel', this.state.targetedUser.socketID, newChannel);
        }
        if (doesPrivateChannelExist.length > 0) {
            this.changeActiveChannel(doesPrivateChannelExist[0]);
        }
        this.setState({ privateChannelModal: false, targetedUser: '' });
    };
    Chat.prototype.render = function () {
        var _this = this;
        var _a = this.props, messages = _a.messages, socket = _a.socket, channels = _a.channels, activeChannel = _a.activeChannel, typers = _a.typers, dispatch = _a.dispatch, user = _a.user, screenWidth = _a.screenWidth;
        var idActive = activeChannel.id;
        var filteredMessages = messages.filter(function (message) { return message.channelID === activeChannel.name; });
        var username = this.props.user.username;
        var re = new RegExp("," + username, 'g');
        var channelName = activeChannel.name.replace(re, '');
        var dropDownMenu = (React.createElement("div", { style: {
                width: '21rem',
                top: '0',
                alignSelf: 'baseline',
                padding: '0',
                margin: '0',
                order: '1',
            } },
            React.createElement(DropdownButton, { key: 1, style: { width: '21rem' }, id: "user-menu", bsSize: "large", bsStyle: "primary", title: username },
                React.createElement(MenuItem, { style: { width: '21rem' }, eventKey: "4", onSelect: this.handleSignOut }, "Sign out"))));
        var PrivateMessageModal = (React.createElement("div", null,
            React.createElement(Modal, { bsSize: "small", key: 1, show: this.state.privateChannelModal, onHide: this.closePrivateChannelModal },
                React.createElement(Modal.Header, null, this.state.targetedUser.username),
                React.createElement(Modal.Body, null,
                    React.createElement(Button, { onClick: this.handleSendDirectMessage.bind(this) }, "Direct Message")),
                React.createElement(Modal.Footer, null,
                    React.createElement(Button, { onClick: this.closePrivateChannelModal.bind(this) }, "Close")))));
        var mobileNav = (React.createElement(Navbar, { fixedTop: true, style: { background: '#337ab7', color: 'white' } },
            React.createElement("span", { style: { fontSize: '2em' } }, username),
            React.createElement(Navbar.Toggle, null),
            React.createElement(Navbar.Collapse, { style: { maxHeight: '100%' } },
                React.createElement(Button, { bsStyle: "primary", onSelect: this.handleSignOut },
                    ' ',
                    "Sign out"),
                React.createElement("section", { style: { order: '2', marginTop: '1.5em' } },
                    React.createElement(Channels, { socket: socket, onClick: this.changeActiveChannel, channels: channels, messages: messages, dispatch: dispatch })))));
        var bigNav = (React.createElement("div", { className: "part rightSide navChat" },
            React.createElement("div", { className: "stickyPart" },
                React.createElement("div", { className: "searchCont" },
                    React.createElement(FontAwesome, { className: "super-crazy-colors", name: "search", size: "lg", style: { textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' } }),
                    React.createElement(Input, { ref: "friendName", type: "text", hasFeedback: true, name: "friendName", onFocus: this.onFocus, autoFocus: false, placeholder: "Find", value: this.state.findUser, onChange: this.handleChange })),
                !this.state.find ? (React.createElement("section", { className: "itemsSection" },
                    React.createElement(ItemsList, { selectItem: this.selectItem, items: this.props.items }),
                    React.createElement(Button, { className: "btnAdd", onClick: this.createChannel, type: "button" }, "Messages"))) : (React.createElement(Channels, { idActive: idActive, username: username, socket: socket, onClick: this.changeActiveChannel, channels: channels, messages: messages, dispatch: dispatch })))));
        return (React.createElement("div", { id: "pageChat", style: {
                margin: '0',
                padding: '0',
                height: '100%',
                width: '100%',
                display: '-webkit-box',
            } },
            React.createElement("div", { onClick: this.onClFind, className: "part mainPart mainChat" },
                React.createElement("div", { className: "title" }, channelName),
                PrivateMessageModal,
                React.createElement("ul", { style: {
                        wordWrap: 'break-word',
                        margin: '0',
                        overflowY: 'auto',
                        padding: '0',
                        paddingBottom: '1em',
                        flexGrow: '1',
                        order: '1',
                    }, ref: "messageList" }, filteredMessages.map(function (message) { return (React.createElement(MessageListItem, { handleClickOnUser: _this.handleClickOnUser, message: message, key: message.id })); })),
                React.createElement(MessageComposer, { socket: socket, activeChannel: activeChannel.name, user: user, onSave: this.handleSave }),
                React.createElement("footer", null,
                    typers.length === 1 && (React.createElement("div", null,
                        React.createElement("span", null,
                            React.createElement(TypingListItem, { username: typers[0], key: 1 }),
                            React.createElement("span", null, " is typing")))),
                    typers.length === 2 && (React.createElement("div", null,
                        React.createElement("span", null,
                            React.createElement(TypingListItem, { username: typers[0], key: 1 }),
                            React.createElement("span", null, " and "),
                            React.createElement(TypingListItem, { username: typers[1], key: 2 }),
                            React.createElement("span", null, " are typing")))),
                    typers.length > 2 && (React.createElement("div", null,
                        React.createElement("span", null, "Several people are typing"))))),
            screenWidth < 500 ? mobileNav : bigNav));
    };
    Chat.propTypes = {
        messages: PropTypes.array.isRequired,
        user: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        channels: PropTypes.array.isRequired,
        activeChannel: PropTypes.object.isRequired,
        typers: PropTypes.array.isRequired,
        socket: PropTypes.object.isRequired,
    };
    return Chat;
}(Component));
export default Chat;
function duplicat(b, c) {
    for (var d = [], e = {}, a = 0; a < b.length; a++)
        e[b[a]] ? e[b[a]]++ : e[b[a]] = 1;
    for (a = 0; a < c.length; a++)
        e[c[a]] && d.push(c[a]) && e[c[a]]--;
    return d.length == b.length && c.length == b.length;
}
;
