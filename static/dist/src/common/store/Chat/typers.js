"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypesChat_1 = require("./TypesChat");
const initialState = [];
function typers(state = initialState, action) {
    switch (action.type) {
        case TypesChat_1.TYPING:
            if (state.indexOf(action.username) === -1) {
                return [...state, action.username];
            }
            return state;
        case TypesChat_1.STOP_TYPING:
            return state.filter((user) => user !== action.username);
        default:
            return state;
    }
}
exports.default = typers;
