var _a;
import { handleActions } from 'redux-actions';
import * as actions from "./actionsApp";
var reducerApp = handleActions((_a = {},
    _a[actions.welcomePage] = function (state, action) { return ({ userName: action.data }); },
    _a[actions.changeIsMobile] = function (state, action) { return ({ isMobile: action.data }); },
    _a[actions.changeWidthAndHeight] = function (state, action) { return ({ isMobile: action.data }); },
    _a), { userName: "", isMobile: false });
export default reducerApp;
