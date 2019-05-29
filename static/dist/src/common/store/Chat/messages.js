"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypesChat_1 = require("./TypesChat");
const types_1 = require("../Auth/types");
const initialState = {
    loaded: false,
    data: [],
    fetchHistory: [],
};
function messages(state = initialState, action) {
    switch (action.type) {
        case TypesChat_1.ADD_MESSAGE:
            return {
                ...state,
                data: [...state.data, action.message],
            };
        case TypesChat_1.RECEIVE_MESSAGE:
            return {
                ...state,
                data: [...state.data, action.message],
            };
        case TypesChat_1.LOAD_MESSAGES:
            return {
                ...state,
                loading: true,
            };
        case TypesChat_1.LOAD_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                fetchHistory: [
                    ...state.fetchHistory,
                    { lastFetch: action.date, channelName: action.channel },
                ],
                data: [
                    ...state.data.filter((message) => message.channelID !== action.channel),
                    ...action.json,
                ],
            };
        case TypesChat_1.LOAD_MESSAGES_FAIL:
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
                fetchHistory: [],
            };
        default:
            return state;
    }
}
exports.default = messages;
