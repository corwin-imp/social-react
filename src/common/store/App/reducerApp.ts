import { handleActions } from 'redux-actions'
import { AnyAction } from 'redux'
import * as actions from "./actionsApp";



interface IAction {
    payload: any;
}

const reducerApp = handleActions<any>(
  {
    [`${actions.welcomePage}`]   : (state, action:AnyAction ) => ({ userName: action.data }),
    [`${actions.changeIsMobile}`]: (state, action:AnyAction) => ({ isMobile: action.data }),
    [`${actions.changeWidthAndHeight}`]: (state, action:AnyAction) => ({ isMobile: action.data })
  },
  { userName: "", isMobile: false }
);
export default reducerApp;
