import browserHistory from '../../services/history'

import fetch from 'isomorphic-fetch'
import Cookies from 'universal-cookie'
import Profile from '../Profile/Profile'
import io from 'socket.io-client'
import { Dispatch } from 'redux'

import * as actionsD from '../Profile/actionsProfile'

const socket = io('', { path: '/api/chat' })

import * as types from "./types";
import { createAction } from 'redux-actions';
//import { createSignalAction } from "../typeSettings";

export const requestSignUp = createAction(types.AUTH_SIGNUP, () => ({}));
export const requestSignOut = createAction(types.AUTH_SIGNOUT, ()=> ({  }));
export const receiveSignOut = createAction(types.AUTH_SIGNOUT_SUCCESS,() => ({  }));
export const requestSignIn = createAction(types.AUTH_SIGNIN,() => ({  }));

const _Cookies: any = Cookies;

const cookie: any = new _Cookies();
export const loadUser = createAction(types.AUTH_LOAD_SUCCESS,(data: any) =>{
  const user = new Profile(data)
  return {
    user
  }
})

export const receiveSocket = createAction(types.RECEIVE_SOCKET,(data: any) => ({ data }));
export const receiveUser = createAction(types.AUTH_SIGNUP_SUCCESS,(dataB: any) =>{
  const user = new Profile(dataB)
  socket.emit('user come', user)
  return {
    user,
  }
})

export const receiveSignIn = createAction(types.AUTH_SIGNIN_SUCCESS,(userbase: any) =>{
  const user = new Profile(userbase)
  socket.emit('user come', user)
  return {
    user,
  }
})

export const setPictureAction = createAction(types.AUTH_CHOOSE_PICTURE,(currentPicture: any) =>{
  return {
    currentPicture,
  }
})

export function receiveAuth(dispatch: Dispatch) {
  const user:any = cookie.load('userId')

  if (user) {
    let dataB = { userId: user }

    return (dispatch: Dispatch ) => {
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
          //dispatch(actionsD.onItem(user))
        })
        .catch(error => {
          throw error
        })
    }
  } else {
    return { type: false }
  }
}


export function checkAuth() {
  if (cookie.load('userId')) {
    return true
  }
  return browserHistory.push('/signin')
}





export function signOut() {
  return (dispatch:Dispatch) => {
    dispatch(requestSignOut())
    return fetch('/api/signout')
      .then(response => {
        if (response.ok) {
          const user: any = cookie.load('userId')
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

export function signUp(user:any) {
  return (dispatch: Dispatch) => {
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
        //dispatch(actionsD.onItem(json._id))
        dispatch(receiveUser(json))
        browserHistory.push('my-profile')
      })
      .catch(error => {
        throw error
      })
  }
}


export function setPicture(choose:any, id: any, dispatch: Dispatch) {
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
      dispatch(setPictureAction(choose))

    })
    .catch(error => {
      throw error
    })
}



export function signIn(user:any) {
  return (dispatch:Dispatch) => {
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
        //dispatch(actionsD.onItem(json._id))
        dispatch(receiveSignIn(json))
        browserHistory.push('/my-profile')
      })
      .catch(error => {
        throw error
      })
  }
}


