import { TYPING, STOP_TYPING } from './TypesChat';
var initialState = [];
export default function typers(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case TYPING:
            if (state.indexOf(action.username) === -1) {
                return state.concat([action.username]);
            }
            return state;
        case STOP_TYPING:
            return state.filter(function (user) { return user !== action.username; });
        default:
            return state;
    }
}
