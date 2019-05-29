import * as types from './AppTypes'
import { AnyAction } from 'redux'
const initialState: any = {
  isMobile: false,
  screenHeight: null,
  screenWidth: null,
}

export default function environment(state = initialState, action: AnyAction) {
  switch (action.type) {
    case types.CHANGE_IS_MOBILE:
      return {
        ...state,
        isMobile: action.isMobile,
      }

    case types.CHANGE_WIDTH_AND_HEIGHT:
      return {
        ...state,
        screenHeight: action.screenHeight,
        screenWidth: action.screenWidth,
      }
    default:
      return state
  }
}
