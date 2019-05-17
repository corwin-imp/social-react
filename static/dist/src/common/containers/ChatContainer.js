import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import * as actions from '../store/Chat/actions';
import PropTypes from 'prop-types';
import Chat from '../components/Chat';
import { connect } from 'react-redux';
import io from 'socket.io-client';
var socket = io('', { path: '/api/chat' });
var initialChannel = 'Lobby'; // NOTE: I hard coded this value for my example.  Change this as you see fit
var ChatContainer = /** @class */ (function (_super) {
    tslib_1.__extends(ChatContainer, _super);
    function ChatContainer(props) {
        return _super.call(this, props) || this;
    }
    ChatContainer.prototype.componentDidMount = function () {
        var _a = this.props, dispatch = _a.dispatch, channels = _a.channels, user = _a.user;
        if (!channels) {
            dispatch(actions.fetchMessages(initialChannel));
        }
    };
    ChatContainer.prototype.render = function () {
        if (!this.props.user.id) {
            return React.createElement("div", { className: "part" }, "First you need to sign In to Social");
        }
        return React.createElement(Chat, tslib_1.__assign({}, this.props, { socket: socket }));
    };
    return ChatContainer;
}(Component));
ChatContainer.propTypes = {
    messages: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    channels: PropTypes.array.isRequired,
    activeChannel: PropTypes.object.isRequired,
    typers: PropTypes.array.isRequired,
};
function mapStateToProps(state) {
    return {
        messages: state.messages.data,
        channels: state.channels.data,
        activeChannel: state.activeChannel,
        user: state.auth.user,
        state: state,
        items: state.reducerItems.items,
        typers: state.typers,
        screenWidth: state.environment.screenWidth,
    };
}
export default connect(mapStateToProps)(ChatContainer);
