import * as types from '../Auth/actionsAuth';
var initialState = '';
export default function welcomePage(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case types.SAVE_USERNAME:
            return action.username;
        case types.AUTH_SIGNOUT_SUCCESS:
            return '';
        default:
            return state;
    }
}
