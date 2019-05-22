"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const types = tslib_1.__importStar(require("./AppTypes"));
const redux_actions_1 = require("redux-actions");
_a = redux_actions_1.createActions({
    [types.SAVE_USERNAME]: data => ({ data }),
    [types.CHANGE_IS_MOBILE]: data => ({ data }),
    [types.CHANGE_WIDTH_AND_HEIGHT]: data => ({ data }),
}), exports.welcomePage = _a.welcomePage, exports.changeIsMobile = _a.changeIsMobile, exports.changeWidthAndHeight = _a.changeWidthAndHeight;
/*
export function welcomePage(username) {
    return {
        type: types.SAVE_USERNAME,
        username,
    }
}
function changeIsMobile(isMobile) {
    return {
        type: types.CHANGE_IS_MOBILE,
        isMobile,
    }
}

function changeWidthAndHeight(screenHeight, screenWidth) {
    return {
        type: types.CHANGE_WIDTH_AND_HEIGHT,
        screenHeight,
        screenWidth,
    }
}
*/
function initEnvironment() {
    return dispatch => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            document.body.style.overflow = 'hidden';
        }
        dispatch(exports.changeIsMobile(isMobile));
        dispatch(exports.changeWidthAndHeight(window.innerHeight, window.innerWidth));
        window.onresize = () => {
            dispatch(exports.changeWidthAndHeight(window.innerHeight, window.innerWidth));
        };
    };
}
exports.initEnvironment = initEnvironment;
