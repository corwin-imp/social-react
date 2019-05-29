import * as types from '../Auth/types'
import { AnyAction } from 'redux'

const initialState: any = ''
export default function welcomePage(state = initialState, action: AnyAction) {
  switch (action.type) {
    case types.SAVE_USERNAME:
      return action.username
    case types.AUTH_SIGNOUT_SUCCESS:
      return ''
    default:
      return state
  }
}
