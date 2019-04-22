import { handleActions } from 'redux-actions'
import * as actions from "./actionsApp";

const reducerApp = handleActions(
  {
    [actions.welcomePage]   : (state, action) => ({ userName: action.data }),
    [actions.changeIsMobile]: (state, action) => ({ isMobile: action.data }),
    [actions.changeWidthAndHeight]: (state, action) => ({ isMobile: action.data })
  },
  { userName: "", isMobile: false }
);
export default reducerApp;
