import * as types from '../constants/ActionTypes'
import { browserHistory } from 'react-router'
import fetch from 'isomorphic-fetch'
import moment from 'moment'

// NOTE:Chat actions

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
export function deleteChannel(channel) {
  let channelObj = { channel: channel.id }

  return dispatch => {
    return fetch('/api/delete-channel', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(channelObj),
    }).then(response => {
      if (response.ok) {
        dispatch({
          type: types.DELETE_CHANNEL,
          channel: channel.id,
        })
        let channelSt = {
          name: 'Lobby',
          id: 0,
        }
        dispatch(changeChannel(channelSt))
      }
    })
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

export function welcomePage(username) {
  return {
    type: types.SAVE_USERNAME,
    username,
  }
}

export function fetchMyChannels(channels) {
  let channelObj = { channels: channels }

  return dispatch => {
    dispatch(requestChannels())
    return fetch('/api/my-channels', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(channelObj),
    })
      .then(response => response.json())
      .then(json => {
        dispatch(receiveChannels(json))
      })
      .catch(error => {
        throw error
      })
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

export function fetchMessages(channel) {
  return dispatch => {
    dispatch(requestMessages())
    return fetch(`/api/messages/${channel}`)
      .then(response => response.json())
      .then(json => dispatch(receiveMessages(json, channel)))
      .catch(error => {
        throw error
      })
  }
}

function receiveMessages(json, channel) {
  const date = moment().format('lll')
  return {
    type: types.LOAD_MESSAGES_SUCCESS,
    json,
    channel,
    date,
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

export function usernameValidationList() {
  return dispatch => {
    dispatch(loadingValidationList())
    return fetch('/api/all_usernames')
      .then(response => {
        return response.json()
      })
      .then(json => {
        return dispatch(
          receiveValidationList(json.map(item => item.local.username))
        )
      })
      .catch(error => {
        throw error
      })
  }
}

export function createMessage(message) {
  return dispatch => {
    dispatch(addMessage(message))
    return fetch('/api/newmessage', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    }).catch(error => {
      throw error
    })
  }
}

export function createChannel(channel) {
  return dispatch => {
    return fetch('/api/channels/new_channel', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(channel),
    })
      .then(response => {
        return response.json()
      })
      .then(json => {
        return dispatch(addChannel(json))
      })
      .catch(error => {
        throw error
      })
      .then(
        val => {},
        () => {
          dispatch(addChannel(channel))
        }
      )
  }
}
function changeIsMobile(isMobile) {
  return {
    type: types.CHANGE_IS_MOBILE,
    isMobile,
  }
}

function changeWidthAndHeight(screenHeight, screenWidth) {
  return {
    type: types.CHANGE_WIDTH_AND_HEIGHT,
    screenHeight,
    screenWidth,
  }
}

export function initEnvironment() {
  return dispatch => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
    if (isMobile) {
      document.body.style.overflow = 'hidden'
    }

    dispatch(changeIsMobile(isMobile))
    dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth))

    window.onresize = () => {
      dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth))
    }
  }
}
