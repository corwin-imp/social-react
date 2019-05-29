import {
  ADD_MESSAGE,
  RECEIVE_MESSAGE,
  LOAD_MESSAGES,
  LOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES_FAIL,

} from './TypesChat'

import {  AUTH_SIGNOUT_SUCCESS} from '../Auth/types'

const initialState: any = {
  loaded: false,
  data: [],
  fetchHistory: [],
}
export default function messages(state = initialState, action:any) {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        data: [...state.data, action.message],
      }
    case RECEIVE_MESSAGE:
      return {
        ...state,
        data: [...state.data, action.message],
      }
    case LOAD_MESSAGES:
      return {
        ...state,
        loading: true,
      }
    case LOAD_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        fetchHistory: [
          ...state.fetchHistory,
          { lastFetch: action.date, channelName: action.channel },
        ],
        data: [
          ...state.data.filter((message:any) => message.channelID !== action.channel),
          ...action.json,
        ],
      }
    case LOAD_MESSAGES_FAIL:
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
        fetchHistory: [],
      }
    default:
      return state
  }
}