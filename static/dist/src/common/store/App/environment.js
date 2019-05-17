import * as tslib_1 from "tslib";
import * as types from './AppTypes';
var initialState = {
    isMobile: false,
    screenHeight: null,
    screenWidth: null,
};
export default function environment(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case types.CHANGE_IS_MOBILE:
            return tslib_1.__assign({}, state, { isMobile: action.isMobile });
        case types.CHANGE_WIDTH_AND_HEIGHT:
            return tslib_1.__assign({}, state, { screenHeight: action.screenHeight, screenWidth: action.screenWidth });
        default:
            return state;
    }
}
