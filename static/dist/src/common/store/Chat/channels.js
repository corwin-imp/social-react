"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypesChat_1 = require("./TypesChat");
const types_1 = require("../Auth/types");
const initialState = {
    loaded: false,
    data: [],
};
function channels(state = initialState, action) {
    switch (action.type) {
        case TypesChat_1.ADD_CHANNEL:
            /*   if (state.data.filter(channel => channel.name === action.channel.name).length !== 0) {
            return state;
          }*/
            console.log('st', action);
            return {
                ...state,
                data: [...state.data, action.channel],
            };
        case TypesChat_1.DELETE_CHANNEL:
            console.log('st', state.data);
            state.data.forEach(function (item, i, arr) {
                if (item.id == action.channel) {
                    arr.splice(arr.indexOf(i), 1);
                }
            });
            if (state.data) {
            }
            return {
                ...state,
                data: state.data,
            };
        case TypesChat_1.RECEIVE_CHANNEL:
            if (state.data.filter(channel => channel.name === action.channel.name)
                .length !== 0) {
                return state;
            }
            return {
                ...state,
                data: [...state.data, action.channel],
            };
        case TypesChat_1.LOAD_CHANNELS:
            return {
                ...state,
                loading: true,
            };
        case TypesChat_1.LOAD_CHANNELS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                data: [...state.data, ...action.json],
            };
        case TypesChat_1.LOAD_CHANNELS_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error,
                data: [...state.data],
            };
        case types_1.AUTH_SIGNOUT_SUCCESS:
            return {
                loaded: false,
                data: [],
            };
        default:
            return state;
    }
}
exports.default = channels;
