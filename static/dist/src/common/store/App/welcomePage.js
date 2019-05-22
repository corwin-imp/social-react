"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const types = tslib_1.__importStar(require("../Auth/actionsAuth"));
const initialState = '';
function welcomePage(state = initialState, action) {
    switch (action.type) {
        case types.SAVE_USERNAME:
            return action.username;
        case types.AUTH_SIGNOUT_SUCCESS:
            return '';
        default:
            return state;
    }
}
exports.default = welcomePage;
