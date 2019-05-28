"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypesChat_1 = require("../Chat/TypesChat");
const initialState = {
    loaded: false,
    data: [],
};
function userValidation(state = initialState, action) {
    switch (action.type) {
        case TypesChat_1.LOAD_USERVALIDATION:
            return {
                ...state,
                loading: true,
            };
        case TypesChat_1.LOAD_USERVALIDATION_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                data: action.json,
            };
        case TypesChat_1.LOAD_USERVALIDATION_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error,
                data: [...state.data],
            };
        default:
            return state;
    }
}
exports.default = userValidation;
