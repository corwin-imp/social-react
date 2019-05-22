"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const types = tslib_1.__importStar(require("./AppTypes"));
const initialState = {
    isMobile: false,
    screenHeight: null,
    screenWidth: null,
};
function environment(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_IS_MOBILE:
            return {
                ...state,
                isMobile: action.isMobile,
            };
        case types.CHANGE_WIDTH_AND_HEIGHT:
            return {
                ...state,
                screenHeight: action.screenHeight,
                screenWidth: action.screenWidth,
            };
        default:
            return state;
    }
}
exports.default = environment;
