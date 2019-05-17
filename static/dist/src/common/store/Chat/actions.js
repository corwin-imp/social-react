import * as types from "./TypesChat";
import fetch from "isomorphic-fetch";
import moment from "moment";
import { createAction } from "redux-actions";
// NOTE:Chat actions
export var addMessage = createAction(types.ADD_MESSAGE, function (data) { return ({ data: data }); });
export var receiveRawMessage = createAction(types.RECEIVE_MESSAGE, function (data) { return ({
    data: data
}); });
export var receiveRawChannel = createAction(types.RECEIVE_CHANNEL, function (data) { return ({
    data: data
}); });
export var addChannel = createAction(types.ADD_CHANNEL, function (data) { return ({ data: data }); });
export var typing = createAction(types.TYPING, function (data) { return ({ data: data }); });
export var stopTyping = createAction(types.STOP_TYPING, function (data) { return ({ data: data }); });
export var changeChannel = createAction(types.CHANGE_CHANNEL, function (data) { return ({
    data: data
}); });
export var requestChannels = createAction(types.LOAD_CHANNELS, function (data) { return ({
    data: data
}); });
export var receiveChannels = createAction(types.LOAD_CHANNELS_SUCCESS, function (data) { return ({ data: data }); });
export var requestMessages = createAction(types.LOAD_MESSAGES, function (data) { return ({
    data: data
}); });
export var loadingValidationList = createAction(types.LOAD_USERVALIDATION, function (data) { return ({ data: data }); });
export var receiveValidationList = createAction(types.LOAD_USERVALIDATION_SUCCESS, function (data) { return ({ data: data }); });
export var receiveMessages = createAction(types.LOAD_MESSAGES_SUCCESS, function (json, channel) {
    var date = moment().format("lll");
    return {
        json: json,
        channel: channel,
        date: date
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
export function deleteChannel(channel) {
    var channelObj = { channel: channel.id };
    return function (dispatch) {
        return fetch("/api/delete-channel", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(channelObj)
        }).then(function (response) {
            if (response.ok) {
                dispatch({
                    type: types.DELETE_CHANNEL,
                    channel: channel.id
                });
                var channelSt = {
                    name: "Lobby",
                    id: 0
                };
                dispatch(changeChannel(channelSt));
            }
        });
    };
}
export function fetchMyChannels(channels) {
    var channelObj = { channels: channels };
    return function (dispatch) {
        dispatch(requestChannels());
        return fetch("/api/my-channels", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(channelObj)
        })
            .then(function (response) { return response.json(); })
            .then(function (json) {
            dispatch(receiveChannels(json));
        })
            .catch(function (error) {
            throw error;
        });
    };
}
export function fetchMessages(channel) {
    return function (dispatch) {
        dispatch(requestMessages());
        return fetch("/api/messages/" + channel)
            .then(function (response) { return response.json(); })
            .then(function (json) { return dispatch(receiveMessages(json, channel)); })
            .catch(function (error) {
            throw error;
        });
    };
}
export function usernameValidationList() {
    return function (dispatch) {
        dispatch(loadingValidationList());
        return fetch("/api/all_usernames")
            .then(function (response) {
            return response.json();
        })
            .then(function (json) {
            return dispatch(receiveValidationList(json.map(function (item) { return item.local.username; })));
        })
            .catch(function (error) {
            throw error;
        });
    };
}
export function createMessage(message) {
    return function (dispatch) {
        dispatch(addMessage(message));
        return fetch("/api/newmessage", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        }).catch(function (error) {
            throw error;
        });
    };
}
export function createChannel(channel) {
    return function (dispatch) {
        return fetch("/api/channels/new_channel", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(channel)
        })
            .then(function (response) {
            return response.json();
        })
            .then(function (json) {
            return dispatch(addChannel(json));
        })
            .catch(function (error) {
            throw error;
        })
            .then(function (val) { }, function () {
            dispatch(addChannel(channel));
        });
    };
}
