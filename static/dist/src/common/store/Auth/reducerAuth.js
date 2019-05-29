"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const redux_actions_1 = require("redux-actions");
const actions = tslib_1.__importStar(require("./actionsAuth"));
const initialState = {
    loaded: false,
    user: {
        username: 'test',
        id: null,
        socketID: null,
    },
};
const reducerAuth = redux_actions_1.handleActions({
    [`${actions.requestSignUp}`]: (state) => {
        return {
            ...state,
            signingUp: true,
        };
    },
    [`${actions.requestSignOut}`]: (state, action) => {
        return {
            ...state,
            signingOut: true,
        };
    },
    [`actions.receiveSignOut`]: (state, action) => {
        return {
            ...state,
            signingOut: false,
            user: {
                username: 'test',
                id: null,
            },
        };
    },
    [`${actions.requestSignIn}`]: (state, action) => {
        return {
            ...state,
            signingIn: true,
        };
    },
    [`${actions.loadUser}`]: (state, action) => {
        return {
            ...state,
            loading: false,
            loaded: true,
            user: action.user,
        };
    },
    [`${actions.receiveSocket}`]: (state, action) => {
        return {
            ...state,
            user: {
                ...state.user,
                socketID: action.socketID,
            },
        };
    },
    [`${actions.receiveUser}`]: (state, action) => {
        return {
            ...state,
            signingUp: false,
            myProfile: action.user,
            user: action.user,
        };
    },
    [`${actions.receiveSignIn}`]: (state, action) => {
        return {
            ...state,
            signingIn: false,
            user: action.user,
        };
    },
    [`${actions.setPictureAction}`]: (state, action) => {
        return {
            ...state,
            user: {
                ...state.user,
                picture: action.currentPicture,
            },
        };
    },
}, initialState);
exports.default = reducerAuth;
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
