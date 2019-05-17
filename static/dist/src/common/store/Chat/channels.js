import * as tslib_1 from "tslib";
import { ADD_CHANNEL, RECEIVE_CHANNEL, DELETE_CHANNEL, LOAD_CHANNELS, LOAD_CHANNELS_SUCCESS, LOAD_CHANNELS_FAIL } from './TypesChat';
import { AUTH_SIGNOUT_SUCCESS } from '../Auth/types';
var initialState = {
    loaded: false,
    data: [],
};
export default function channels(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ADD_CHANNEL:
            /*   if (state.data.filter(channel => channel.name === action.channel.name).length !== 0) {
            return state;
          }*/
            console.log('st', action);
            return tslib_1.__assign({}, state, { data: state.data.concat([action.channel]) });
        case DELETE_CHANNEL:
            console.log('st', state.data);
            state.data.forEach(function (item, i, arr) {
                if (item.id == action.channel) {
                    arr.splice(arr.indexOf(i), 1);
                }
            });
            if (state.data) {
            }
            return tslib_1.__assign({}, state, { data: state.data });
        case RECEIVE_CHANNEL:
            if (state.data.filter(function (channel) { return channel.name === action.channel.name; })
                .length !== 0) {
                return state;
            }
            return tslib_1.__assign({}, state, { data: state.data.concat([action.channel]) });
        case LOAD_CHANNELS:
            return tslib_1.__assign({}, state, { loading: true });
        case LOAD_CHANNELS_SUCCESS:
            return tslib_1.__assign({}, state, { loading: false, loaded: true, data: state.data.concat(action.json) });
        case LOAD_CHANNELS_FAIL:
            return tslib_1.__assign({}, state, { loading: false, loaded: false, error: action.error, data: state.data.slice() });
        case AUTH_SIGNOUT_SUCCESS:
            return {
                loaded: false,
                data: [],
            };
        default:
            return state;
    }
}
