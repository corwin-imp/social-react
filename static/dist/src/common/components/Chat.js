"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const MessageComposer_1 = tslib_1.__importDefault(require("./MessageComposer"));
const MessageListItem_1 = tslib_1.__importDefault(require("./MessageListItem"));
const Channels_1 = tslib_1.__importDefault(require("./Channels"));
const ItemsList_1 = tslib_1.__importDefault(require("./ItemsList"));
const react_fontawesome_1 = tslib_1.__importDefault(require("react-fontawesome"));
const actions = tslib_1.__importStar(require("../store/Chat/actions"));
const authActions = tslib_1.__importStar(require("../store/Auth/actionsAuth"));
const TypingListItem_1 = tslib_1.__importDefault(require("./TypingListItem"));
const node_uuid_1 = tslib_1.__importDefault(require("node-uuid"));
const react_bootstrap_1 = require("react-bootstrap");
class Chat extends react_1.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            privateChannelModal: false,
            targetedUser: '',
            findUser: '',
            selectItem: [],
            find: true,
        };
    }
    componentDidMount() {
        const { socket, user, dispatch, channels } = this.props;
        if (!channels.length && user.id) {
            dispatch(actions.fetchMyChannels(user.channels));
        }
        socket.emit('chat mounted', user);
        socket.on('new bc message', msg => dispatch(actions.receiveRawMessage(msg)));
        socket.on('typing bc', user => dispatch(actions.typing(user)));
        socket.on('stop typing bc', user => dispatch(actions.stopTyping(user)));
        socket.on('new channel', channel => dispatch(actions.receiveRawChannel(channel)));
        socket.on('receive socket', socketID => {
            dispatch(authActions.receiveSocket(socketID));
        });
        socket.on('receive private channel', channel => dispatch(actions.receiveRawChannel(channel)));
    }
    componentDidUpdate() {
        const messageList = this.refs.messageList;
        messageList.scrollTop = messageList.scrollHeight;
    }
    handleChange(event) {
        this.setState({ findUser: event.target.value });
    }
    selectItem(event, data) {
        event.preventDefault();
        let item = this.state.selectItem;
        item[data.dataId] = data.name;
        this.setState({
            selectItem: item,
        });
        event.currentTarget.classList.toggle('itemSelect');
    }
    createChannel(event) {
        const { dispatch, channels, socket, user } = this.props;
        event.preventDefault();
        /*   if (this.state.selectItem.length > 0 && channels.filter(channel => {
                    return channel.between === this.state.selectItem;
                }).length < 1) {
    
            }*/
        let arrChannels = this.state.selectItem;
        let ids = Object.keys(arrChannels);
        let names = Object.values(arrChannels);
        ids.push(user.id);
        names.push(user.name);
        names = names.join(',');
        for (let chan in channels) {
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
        const newChannel = {
            //  name: `channel  ${channels.length + 1 }`,
            name: names,
            id: `${Date.now()}${node_uuid_1.default.v4()}`,
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
    }
    onFocus(event) {
        if (event.currentTarget.classList == 'form-control') {
            this.setState({ find: false });
        }
    }
    onClFind(event) {
        console.log('onClFind-------------------------------');
        this.setState({ find: true });
    }
    handleSave(newMessage) {
        const { dispatch } = this.props;
        if (newMessage.text.length !== 0) {
            dispatch(actions.createMessage(newMessage));
        }
    }
    handleSignOut() {
        const { dispatch } = this.props;
        dispatch(authActions.signOut());
    }
    changeActiveChannel(channel) {
        const { socket, activeChannel, dispatch } = this.props;
        socket.emit('leave channel', activeChannel);
        socket.emit('join channel', channel);
        dispatch(actions.changeChannel(channel));
        dispatch(actions.fetchMessages(channel.name));
    }
    handleClickOnUser(user) {
        this.setState({ privateChannelModal: true, targetedUser: user });
    }
    closePrivateChannelModal(event) {
        event.preventDefault();
        this.setState({ privateChannelModal: false });
    }
    handleSendDirectMessage() {
        const { dispatch, socket, channels, user } = this.props;
        const doesPrivateChannelExist = channels.filter(item => {
            return (item.name ===
                (`${this.state.targetedUser.username}+${user.username}` ||
                    `${user.username}+${this.state.targetedUser.username}`));
        });
        if (user.username !== this.state.targetedUser.username &&
            doesPrivateChannelExist.length === 0) {
            const newChannel = {
                name: `${this.state.targetedUser.username}+${user.username}`,
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
    }
    render() {
        const { messages, socket, channels, activeChannel, typers, dispatch, user, screenWidth, } = this.props;
        let idActive = activeChannel.id;
        const filteredMessages = messages.filter(message => message.channelID === activeChannel.name);
        const username = this.props.user.username;
        var re = new RegExp(`,${username}`, 'g');
        let channelName = activeChannel.name.replace(re, '');
        const dropDownMenu = (react_1.default.createElement("div", { style: {
                width: '21rem',
                top: '0',
                alignSelf: 'baseline',
                padding: '0',
                margin: '0',
                order: '1',
            } },
            react_1.default.createElement(react_bootstrap_1.DropdownButton, { key: 1, style: { width: '21rem' }, id: "user-menu", bsSize: "large", bsStyle: "primary", title: username },
                react_1.default.createElement(react_bootstrap_1.MenuItem, { style: { width: '21rem' }, eventKey: "4", onSelect: this.handleSignOut }, "Sign out"))));
        const PrivateMessageModal = (react_1.default.createElement("div", null,
            react_1.default.createElement(react_bootstrap_1.Modal, { bsSize: "small", key: 1, show: this.state.privateChannelModal, onHide: this.closePrivateChannelModal },
                react_1.default.createElement(react_bootstrap_1.Modal.Header, null, this.state.targetedUser.username),
                react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
                    react_1.default.createElement(react_bootstrap_1.Button, { onClick: this.handleSendDirectMessage.bind(this) }, "Direct Message")),
                react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
                    react_1.default.createElement(react_bootstrap_1.Button, { onClick: this.closePrivateChannelModal.bind(this) }, "Close")))));
        const mobileNav = (react_1.default.createElement(react_bootstrap_1.Navbar, { fixedTop: true, style: { background: '#337ab7', color: 'white' } },
            react_1.default.createElement("span", { style: { fontSize: '2em' } }, username),
            react_1.default.createElement(react_bootstrap_1.Navbar.Toggle, null),
            react_1.default.createElement(react_bootstrap_1.Navbar.Collapse, { style: { maxHeight: '100%' } },
                react_1.default.createElement(react_bootstrap_1.Button, { bsStyle: "primary", onSelect: this.handleSignOut },
                    ' ',
                    "Sign out"),
                react_1.default.createElement("section", { style: { order: '2', marginTop: '1.5em' } },
                    react_1.default.createElement(Channels_1.default, { socket: socket, onClick: this.changeActiveChannel, channels: channels, messages: messages, dispatch: dispatch })))));
        const bigNav = (react_1.default.createElement("div", { className: "part rightSide navChat" },
            react_1.default.createElement("div", { className: "stickyPart" },
                react_1.default.createElement("div", { className: "searchCont" },
                    react_1.default.createElement(react_fontawesome_1.default, { className: "super-crazy-colors", name: "search", size: "lg", style: { textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' } }),
                    react_1.default.createElement(react_bootstrap_1.Input, { ref: "friendName", type: "text", hasFeedback: true, name: "friendName", onFocus: this.onFocus, autoFocus: false, placeholder: "Find", value: this.state.findUser, onChange: this.handleChange })),
                !this.state.find ? (react_1.default.createElement("section", { className: "itemsSection" },
                    react_1.default.createElement(ItemsList_1.default, { selectItem: this.selectItem, items: this.props.items }),
                    react_1.default.createElement(react_bootstrap_1.Button, { className: "btnAdd", onClick: this.createChannel, type: "button" }, "Messages"))) : (react_1.default.createElement(Channels_1.default, { idActive: idActive, username: username, socket: socket, onClick: this.changeActiveChannel, channels: channels, messages: messages, dispatch: dispatch })))));
        return (react_1.default.createElement("div", { id: "pageChat", style: {
                margin: '0',
                padding: '0',
                height: '100%',
                width: '100%',
                display: '-webkit-box',
            } },
            react_1.default.createElement("div", { onClick: this.onClFind, className: "part mainPart mainChat" },
                react_1.default.createElement("div", { className: "title" }, channelName),
                PrivateMessageModal,
                react_1.default.createElement("ul", { style: {
                        wordWrap: 'break-word',
                        margin: '0',
                        overflowY: 'auto',
                        padding: '0',
                        paddingBottom: '1em',
                        flexGrow: '1',
                        order: '1',
                    }, ref: "messageList" }, filteredMessages.map(message => (react_1.default.createElement(MessageListItem_1.default, { handleClickOnUser: this.handleClickOnUser, message: message, key: message.id })))),
                react_1.default.createElement(MessageComposer_1.default, { socket: socket, activeChannel: activeChannel.name, user: user, onSave: this.handleSave }),
                react_1.default.createElement("footer", null,
                    typers.length === 1 && (react_1.default.createElement("div", null,
                        react_1.default.createElement("span", null,
                            react_1.default.createElement(TypingListItem_1.default, { username: typers[0], key: 1 }),
                            react_1.default.createElement("span", null, " is typing")))),
                    typers.length === 2 && (react_1.default.createElement("div", null,
                        react_1.default.createElement("span", null,
                            react_1.default.createElement(TypingListItem_1.default, { username: typers[0], key: 1 }),
                            react_1.default.createElement("span", null, " and "),
                            react_1.default.createElement(TypingListItem_1.default, { username: typers[1], key: 2 }),
                            react_1.default.createElement("span", null, " are typing")))),
                    typers.length > 2 && (react_1.default.createElement("div", null,
                        react_1.default.createElement("span", null, "Several people are typing"))))),
            screenWidth < 500 ? mobileNav : bigNav));
    }
}
Chat.propTypes = {
    messages: prop_types_1.default.array.isRequired,
    user: prop_types_1.default.object.isRequired,
    dispatch: prop_types_1.default.func.isRequired,
    channels: prop_types_1.default.array.isRequired,
    activeChannel: prop_types_1.default.object.isRequired,
    typers: prop_types_1.default.array.isRequired,
    socket: prop_types_1.default.object.isRequired,
};
exports.default = Chat;
function duplicat(b, c) {
    for (var d = [], e = {}, a = 0; a < b.length; a++)
        e[b[a]] ? e[b[a]]++ : e[b[a]] = 1;
    for (a = 0; a < c.length; a++)
        e[c[a]] && d.push(c[a]) && e[c[a]]--;
    return d.length == b.length && c.length == b.length;
}
;
