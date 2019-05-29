import {
  LOAD_USERVALIDATION,
  LOAD_USERVALIDATION_SUCCESS,
  LOAD_USERVALIDATION_FAIL,
} from '../Chat/TypesChat'
import { AnyAction } from 'redux'
const initialState: any = {
  loaded: false,
  data: [],
}

export default function userValidation(state = initialState, action: AnyAction) {
  switch (action.type) {
    case LOAD_USERVALIDATION:
      return {
        ...state,
        loading: true,
      }
    case LOAD_USERVALIDATION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.json,
      }
    case LOAD_USERVALIDATION_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        data: [...state.data],
      }
    default:
      return state
  }
}
