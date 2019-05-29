import { handleActions } from 'redux-actions'
import * as actions from "./actionsAuth";


const initialState: any = {
  loaded: false,
  user: {
    username: 'test',
    id: null,
    socketID: null,
  },
}

const reducerAuth = handleActions(
    {
      [`${actions.requestSignUp}`]: (state) => {
        return {
          ...state,
          signingUp: true,
        }
      },
      [`${actions.requestSignOut}`]: (state:any, action:any) => {
        return {
          ...state,
          signingOut: true,
        }
      },
        [`actions.receiveSignOut`]: (state:any, action:any) =>  {

            return {
              ...state,
              signingOut: false,

              user: {
                username: 'test',
                id: null,
              },
            }
      },
      [`${actions.requestSignIn}`]: (state:any, action:any) => {

        return {
          ...state,
          signingIn: true,
        }
      },
      [`${actions.loadUser}`]: (state:any, action:any) => {

        return {
          ...state,
          loading: false,
          loaded: true,
          user: action.user,
        }
      },
      [`${actions.receiveSocket}`]: (state:any, action:any) => {

        return {
          ...state,
          user: {
            ...state.user,
            socketID: action.socketID,
          },
        }
      },
      [`${actions.receiveUser}`]: (state:any, action:any) => {

        return {
          ...state,
          signingUp: false,
          myProfile: action.user,
          user: action.user,
        }
      },
      [`${actions.receiveSignIn}`]: (state:any, action:any) => {

        return {
          ...state,
          signingIn: false,
          user: action.user,
        }
      },
      [`${actions.setPictureAction}`]: (state:any, action:any) => {

        return {
          ...state,
          user: {
            ...state.user,
            picture: action.currentPicture,
          },
        }
      },
    },
    initialState
);
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
