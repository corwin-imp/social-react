import * as types from "./TypesChat";
//import { browserHistory } from "react-router";
import fetch from "isomorphic-fetch";
import moment from "moment";
import { createAction, createActions } from "redux-actions";
// NOTE:Chat actions
import { Dispatch } from 'redux'
export const addMessage = createAction(types.ADD_MESSAGE, (data: any) => ({ data }));
export const receiveRawMessage = createAction(types.RECEIVE_MESSAGE, (data: any) => ({
  data
}));
export const receiveRawChannel = createAction(types.RECEIVE_CHANNEL, (data: any) => ({
  data
}));
export const addChannel = createAction(types.ADD_CHANNEL, (data: any) => ({ data }));
export const typing = createAction(types.TYPING, (data: any) => ({ data }));
export const stopTyping = createAction(types.STOP_TYPING, (data: any) => ({ data }));
export const changeChannel = createAction(types.CHANGE_CHANNEL, (data: any) => ({
  data
}));
export const requestChannels = createAction(types.LOAD_CHANNELS, () => ({

}));
export const receiveChannels = createAction(
  types.LOAD_CHANNELS_SUCCESS,
    (data: any) => ({ data })
);
export const requestMessages = createAction(types.LOAD_MESSAGES, () => ({

}));
export const loadingValidationList = createAction(
  types.LOAD_USERVALIDATION,
    () => ({  })
);
export const receiveValidationList = createAction(
  types.LOAD_USERVALIDATION_SUCCESS,
    (data: any) => ({ data })
);
export const receiveMessages = createAction(
    types.LOAD_MESSAGES_SUCCESS,
    (json:any, channel:any) => {
      const date = moment().format("lll");
      return {
        json,
        channel,
        date
      };
    }
);
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
export function deleteChannel(channel:any) {
  let channelObj = { channel: channel.id };

  return (dispatch:Dispatch) => {
    return fetch("/api/delete-channel", {
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
        dispatch(changeChannel(channelSt));
      }
    });
  };
}

export function fetchMyChannels(channels:any) {
  let channelObj = { channels: channels };

  return (dispatch:Dispatch) => {
    dispatch(requestChannels());
    return fetch("/api/my-channels", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(channelObj)
    })
      .then(response => response.json())
      .then(json => {
        dispatch(receiveChannels(json));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function fetchMessages(channel:any) {
  return (dispatch:Dispatch) => {
    dispatch(requestMessages());
    return fetch(`/api/messages/${channel}`)
      .then(response => response.json())
      .then(json => dispatch(receiveMessages(json, channel)))
      .catch(error => {
        throw error;
      });
  };
}



export function usernameValidationList() {
  return (dispatch:Dispatch) => {
    dispatch(loadingValidationList());
    return fetch("/api/all_usernames")
      .then(response => {
        return response.json();
      })
      .then(json => {
        return dispatch(
          receiveValidationList(json.map((item:any) => item.local.username))
        );
      })
      .catch(error => {
        throw error;
      });
  };
}

export function createMessage(message:any) {
  return (dispatch:Dispatch) => {
    dispatch(addMessage(message));
    return fetch("/api/newmessage", {
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

export function createChannel(channel:any) {
  return (dispatch:Dispatch) => {
    return fetch("/api/channels/new_channel", {
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
        return dispatch(addChannel(json));
      })
      .catch(error => {
        throw error;
      })
      .then(
        val => {},
        () => {
          dispatch(addChannel(channel));
        }
      );
  };
}
