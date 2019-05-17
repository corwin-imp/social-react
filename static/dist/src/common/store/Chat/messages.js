import * as tslib_1 from "tslib";
import { ADD_MESSAGE, RECEIVE_MESSAGE, LOAD_MESSAGES, LOAD_MESSAGES_SUCCESS, LOAD_MESSAGES_FAIL, } from './TypesChat';
import { AUTH_SIGNOUT_SUCCESS } from '../Auth/types';
var initialState = {
    loaded: false,
    data: [],
    fetchHistory: [],
};
export default function messages(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ADD_MESSAGE:
            return tslib_1.__assign({}, state, { data: state.data.concat([action.message]) });
        case RECEIVE_MESSAGE:
            return tslib_1.__assign({}, state, { data: state.data.concat([action.message]) });
        case LOAD_MESSAGES:
            return tslib_1.__assign({}, state, { loading: true });
        case LOAD_MESSAGES_SUCCESS:
            return tslib_1.__assign({}, state, { loading: false, loaded: true, fetchHistory: state.fetchHistory.concat([
                    { lastFetch: action.date, channelName: action.channel },
                ]), data: state.data.filter(function (message) { return message.channelID !== action.channel; }).concat(action.json) });
        case LOAD_MESSAGES_FAIL:
            return tslib_1.__assign({}, state, { loading: false, loaded: false, error: action.error, data: state.data.slice() });
        case AUTH_SIGNOUT_SUCCESS:
            return {
                loaded: false,
                data: [],
                fetchHistory: [],
            };
        default:
            return state;
    }
}
