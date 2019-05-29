import { TYPING, STOP_TYPING } from './TypesChat'

const initialState:any = []
export default function typers(state = initialState, action:any) {
  switch (action.type) {
    case TYPING:
      if (state.indexOf(action.username) === -1) {
        return [...state, action.username]
      }
      return state
    case STOP_TYPING:
      return state.filter((user:any) => user !== action.username)
    default:
      return state
  }
}
