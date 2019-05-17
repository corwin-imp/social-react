import * as tslib_1 from "tslib";
var _a;
import { handleActions } from 'redux-actions';
import * as actions from "./actionsAuth";
var initialState = {
    loaded: false,
    user: {
        username: 'test',
        id: null,
        socketID: null,
    },
};
var reducerAuth = handleActions((_a = {},
    _a[actions.requestSignUp] = function (state) {
        return tslib_1.__assign({}, state, { signingUp: true });
    },
    _a[actions.requestSignOut] = function (state, action) {
        return tslib_1.__assign({}, state, { signingOut: true });
    },
    _a[actions.receiveSignOut] = function (state, action) {
        return tslib_1.__assign({}, state, { signingOut: false, user: {
                username: 'test',
                id: null,
            } });
    },
    _a[actions.requestSignIn] = function (state, action) {
        return tslib_1.__assign({}, state, { signingIn: true });
    },
    _a[actions.loadUser] = function (state, action) {
        return tslib_1.__assign({}, state, { loading: false, loaded: true, user: action.user });
    },
    _a[actions.receiveSocket] = function (state, action) {
        return tslib_1.__assign({}, state, { user: tslib_1.__assign({}, state.user, { socketID: action.socketID }) });
    },
    _a[actions.receiveUser] = function (state, action) {
        return tslib_1.__assign({}, state, { signingUp: false, myProfile: action.user, user: action.user });
    },
    _a[actions.receiveSignIn] = function (state, action) {
        return tslib_1.__assign({}, state, { signingIn: false, user: action.user });
    },
    _a[actions.setPictureAction] = function (state, action) {
        return tslib_1.__assign({}, state, { user: tslib_1.__assign({}, state.user, { picture: action.currentPicture }) });
    },
    _a), initialState);
export default reducerAuth;
/*
export default function authReducer(state = initialState, action = {}) {
    case AUTH_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
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


    case AUTH_SIGNUP_FAIL:
      return {
        ...state,
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


    default:
      return state
  }
}*/
