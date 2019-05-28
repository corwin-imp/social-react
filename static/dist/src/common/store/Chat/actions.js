"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const types = tslib_1.__importStar(require("./TypesChat"));
const isomorphic_fetch_1 = tslib_1.__importDefault(require("isomorphic-fetch"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const redux_actions_1 = require("redux-actions");
// NOTE:Chat actions
exports.addMessage = redux_actions_1.createAction(types.ADD_MESSAGE, data => ({ data }));
exports.receiveRawMessage = redux_actions_1.createAction(types.RECEIVE_MESSAGE, data => ({
    data
}));
exports.receiveRawChannel = redux_actions_1.createAction(types.RECEIVE_CHANNEL, data => ({
    data
}));
exports.addChannel = redux_actions_1.createAction(types.ADD_CHANNEL, data => ({ data }));
exports.typing = redux_actions_1.createAction(types.TYPING, data => ({ data }));
exports.stopTyping = redux_actions_1.createAction(types.STOP_TYPING, data => ({ data }));
exports.changeChannel = redux_actions_1.createAction(types.CHANGE_CHANNEL, data => ({
    data
}));
exports.requestChannels = redux_actions_1.createAction(types.LOAD_CHANNELS, data => ({
    data
}));
exports.receiveChannels = redux_actions_1.createAction(types.LOAD_CHANNELS_SUCCESS, data => ({ data }));
exports.requestMessages = redux_actions_1.createAction(types.LOAD_MESSAGES, data => ({
    data
}));
exports.loadingValidationList = redux_actions_1.createAction(types.LOAD_USERVALIDATION, data => ({ data }));
exports.receiveValidationList = redux_actions_1.createAction(types.LOAD_USERVALIDATION_SUCCESS, data => ({ data }));
exports.receiveMessages = redux_actions_1.createAction(types.LOAD_MESSAGES_SUCCESS, (json, channel) => {
    const date = moment_1.default().format("lll");
    return {
        json,
        channel,
        date
    };
});
/*
function addMessage(message) {
    return {
        type: types.ADD_MESSAGE,
        message,
    }
}

export function receiveRawMessage(message) {
    return {
        type: types.RECEIVE_MESSAGE,
        message,
    }
}

export function receiveRawChannel(channel) {
    return {
        type: types.RECEIVE_CHANNEL,
        channel,
    }
}
function addChannel(channel) {
    return {
        type: types.ADD_CHANNEL,
        channel,
    }
}

export function typing(username) {
    return {
        type: types.TYPING,
        username,
    }
}

export function stopTyping(username) {
    return {
        type: types.STOP_TYPING,
        username,
    }
}

export function changeChannel(channel) {
    return {
        type: types.CHANGE_CHANNEL,
        channel,
    }
}
function requestChannels() {
    return {
        type: types.LOAD_CHANNELS,
    }
}

function receiveChannels(json) {
    return {
        type: types.LOAD_CHANNELS_SUCCESS,
        json,
    }
}

function requestMessages() {
    return {
        type: types.LOAD_MESSAGES,
    }
}

function loadingValidationList() {
    return {
        type: types.LOAD_USERVALIDATION,
    }
}

function receiveValidationList(json) {
    return {
        type: types.LOAD_USERVALIDATION_SUCCESS,
        json,
    }
}
function receiveMessages(json, channel) {
  const date = moment().format("lll");
  return {
    type: types.LOAD_MESSAGES_SUCCESS,
    json,
    channel,
    date
  };
}
*/
function deleteChannel(channel) {
    let channelObj = { channel: channel.id };
    return dispatch => {
        return isomorphic_fetch_1.default("/api/delete-channel", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(channelObj)
        }).then(response => {
            if (response.ok) {
                dispatch({
                    type: types.DELETE_CHANNEL,
                    channel: channel.id
                });
                let channelSt = {
                    name: "Lobby",
                    id: 0
                };
                dispatch(exports.changeChannel(channelSt));
            }
        });
    };
}
exports.deleteChannel = deleteChannel;
function fetchMyChannels(channels) {
    let channelObj = { channels: channels };
    return dispatch => {
        dispatch(exports.requestChannels());
        return isomorphic_fetch_1.default("/api/my-channels", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(channelObj)
        })
            .then(response => response.json())
            .then(json => {
            dispatch(exports.receiveChannels(json));
        })
            .catch(error => {
            throw error;
        });
    };
}
exports.fetchMyChannels = fetchMyChannels;
function fetchMessages(channel) {
    return dispatch => {
        dispatch(exports.requestMessages());
        return isomorphic_fetch_1.default(`/api/messages/${channel}`)
            .then(response => response.json())
            .then(json => dispatch(exports.receiveMessages(json, channel)))
            .catch(error => {
            throw error;
        });
    };
}
exports.fetchMessages = fetchMessages;
function usernameValidationList() {
    return dispatch => {
        dispatch(exports.loadingValidationList());
        return isomorphic_fetch_1.default("/api/all_usernames")
            .then(response => {
            return response.json();
        })
            .then(json => {
            return dispatch(exports.receiveValidationList(json.map(item => item.local.username)));
        })
            .catch(error => {
            throw error;
        });
    };
}
exports.usernameValidationList = usernameValidationList;
function createMessage(message) {
    return dispatch => {
        dispatch(exports.addMessage(message));
        return isomorphic_fetch_1.default("/api/newmessage", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        }).catch(error => {
            throw error;
        });
    };
}
exports.createMessage = createMessage;
function createChannel(channel) {
    return dispatch => {
        return isomorphic_fetch_1.default("/api/channels/new_channel", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(channel)
        })
            .then(response => {
            return response.json();
        })
            .then(json => {
            return dispatch(exports.addChannel(json));
        })
            .catch(error => {
            throw error;
        })
            .then(val => { }, () => {
            dispatch(exports.addChannel(channel));
        });
    };
}
exports.createChannel = createChannel;
