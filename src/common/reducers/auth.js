import {
  AUTH_LOAD,
  AUTH_LOAD_SUCCESS,
  AUTH_LOAD_FAIL,
  AUTH_SIGNIN,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_FAIL,
  AUTH_SIGNOUT,
  AUTH_SIGNOUT_SUCCESS,
  AUTH_SIGNOUT_FAIL,
  AUTH_CHOOSE_PICTURE,
  AUTH_SIGNUP,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAIL,
  RECEIVE_SOCKET,
} from '../constants/ActionTypes'

const initialState = {
  loaded: false,
  user: {
    username: 'test',
    id: null,
    socketID: null,
  },
}

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case AUTH_LOAD:
      return {
        ...state,
        loading: true,
      }
    case AUTH_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.user,
      }
    case AUTH_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      }
    case AUTH_SIGNIN:
      return {
        ...state,
        signingIn: true,
      }
    case AUTH_SIGNIN_SUCCESS:
      return {
        ...state,
        signingIn: false,
        user: action.user,
      }
    case AUTH_SIGNIN_FAIL:
      return {
        ...state,
        signingIn: false,
        user: {
          username: 'test',
          id: null,
        },
        signInError: action.error,
      }
    case AUTH_SIGNUP:
      return {
        ...state,
        signingUp: true,
      }
    case AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        signingUp: false,
        myProfile: action.user,
        user: action.user,
      }
    case AUTH_SIGNUP_FAIL:
      return {
        ...state,
        user: {
          username: 'test',
          id: null,
        },
      }
    case AUTH_SIGNOUT:
      return {
        ...state,
        signingOut: true,
      }
    case AUTH_SIGNOUT_SUCCESS:
      return {
        ...state,
        signingOut: false,

        user: {
          username: 'test',
          id: null,
        },
      }
    case AUTH_SIGNOUT_FAIL:
      return {
        ...state,
        signingOut: false,
        signOutError: action.error,
      }
    case AUTH_CHOOSE_PICTURE:
      return {
        ...state,
        user: {
          ...state.user,
          picture: action.currentPicture,
        },
      }
    case RECEIVE_SOCKET:
      return {
        ...state,
        user: {
          ...state.user,
          socketID: action.socketID,
        },
      }
    default:
      return state
  }
}
