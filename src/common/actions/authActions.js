import * as types from '../constants/ActionTypes'
import { browserHistory } from 'react-router'
import fetch from 'isomorphic-fetch'
import cookie from 'react-cookie'
import Profile from '../store/Profile'
import io from 'socket.io-client'
import * as actionsD from './actionsItems'

const socket = io('', { path: '/api/chat' })

export function receiveAuth(dispatch) {
  const user = cookie.load('userId')

  if (user) {
    let dataB = { userId: user }

    return dispatch => {
      return fetch('/api/get_user', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataB),
      })
        .then(response => response.json())
        .then(json => {
          dispatch(loadUser(json))
          dispatch(actionsD.onItem(user))
        })
        .catch(error => {
          throw error
        })
    }
  } else {
    return { type: false }
  }
}
export function loadUser(dataB) {
  const user = new Profile(dataB)
  return {
    type: types.AUTH_LOAD_SUCCESS,
    user,
  }
}
export function checkAuth() {
  if (cookie.load('userId')) {
    return true
  }
  return browserHistory.push('/signin')
}

function requestSignUp() {
  return {
    type: types.AUTH_SIGNUP,
  }
}

function receiveUser(dataB) {
  const user = new Profile(dataB)

  socket.emit('user come', user)

  return {
    type: types.AUTH_SIGNUP_SUCCESS,
    user,
  }
}

function requestSignOut() {
  return {
    type: types.AUTH_SIGNOUT,
  }
}
function receiveSignOut() {
  return {
    type: types.AUTH_SIGNOUT_SUCCESS,
  }
}

export function signOut() {
  return dispatch => {
    dispatch(requestSignOut())
    return fetch('/api/signout')
      .then(response => {
        if (response.ok) {
          const user = cookie.load('userId')
          cookie.remove('userId')
          dispatch(receiveSignOut())
          dispatch(actionsD.offItem(user))
          browserHistory.push('/')
        }
      })
      .catch(error => {
        throw error
      })
  }
}

export function signUp(user) {
  return dispatch => {
    dispatch(requestSignUp())
    return fetch('/api/sign_up', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(json => {
        cookie.save('userId', json._id)
        dispatch(actionsD.onItem(json._id))
        dispatch(receiveUser(json))
        browserHistory.push('my-profile')
      })
      .catch(error => {
        throw error
      })
  }
}

function requestSignIn() {
  return {
    type: types.AUTH_SIGNIN,
  }
}
export function setPicture(choose, id, dispatch) {
  let data = {
    choose: choose,
    id: id,
  }
  fetch('/api/set-picture', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      dispatch({
        type: types.AUTH_CHOOSE_PICTURE,
        currentPicture: choose,
      })
    })
    .catch(error => {
      throw error
    })
}

function receiveSignIn(userbase) {
  const user = new Profile(userbase)
  socket.emit('user come', user)

  return {
    type: types.AUTH_SIGNIN_SUCCESS,
    user,
  }
}

export function signIn(user) {
  return dispatch => {
    dispatch(requestSignIn())
    return fetch('/api/sign_in', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(json => {
        cookie.save('userId', json._id)
        dispatch(actionsD.onItem(json._id))
        dispatch(receiveSignIn(json))
        browserHistory.push('/my-profile')
      })
      .catch(error => {
        throw error
      })
  }
}

export function receiveSocket(socketID) {
  return {
    type: types.RECEIVE_SOCKET,
    socketID,
  }
}
