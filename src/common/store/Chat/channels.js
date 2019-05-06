import {
  ADD_CHANNEL,
  RECEIVE_CHANNEL,
  DELETE_CHANNEL,
  LOAD_CHANNELS,
  LOAD_CHANNELS_SUCCESS,
  LOAD_CHANNELS_FAIL
} from './TypesChat'

import {  AUTH_SIGNOUT_SUCCESS} from '../Auth/types'

const initialState = {
  loaded: false,
  data: [],
}

export default function channels(state = initialState, action) {
  switch (action.type) {
    case ADD_CHANNEL:
      /*   if (state.data.filter(channel => channel.name === action.channel.name).length !== 0) {
      return state;
    }*/
      console.log('st', action)
      return {
        ...state,
        data: [...state.data, action.channel],
      }
    case DELETE_CHANNEL:
      console.log('st', state.data)
      state.data.forEach(function(item, i, arr) {
        if (item.id == action.channel) {
          arr.splice(arr.indexOf(i), 1)
        }
      })
      if (state.data) {
      }
      return {
        ...state,
        data: state.data,
      }
    case RECEIVE_CHANNEL:
      if (
        state.data.filter(channel => channel.name === action.channel.name)
          .length !== 0
      ) {
        return state
      }
      return {
        ...state,
        data: [...state.data, action.channel],
      }
    case LOAD_CHANNELS:
      return {
        ...state,
        loading: true,
      }
    case LOAD_CHANNELS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: [...state.data, ...action.json],
      }
    case LOAD_CHANNELS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        data: [...state.data],
      }
    case AUTH_SIGNOUT_SUCCESS:
      return {
        loaded: false,
        data: [],
      }
    default:
      return state
  }
}
