var _a, _b;
import * as types from "./AppTypes";
import { createActions } from 'redux-actions';
export var welcomePage = (_b = createActions((_a = {},
    _a[types.SAVE_USERNAME] = function (data) { return ({ data: data }); },
    _a[types.CHANGE_IS_MOBILE] = function (data) { return ({ data: data }); },
    _a[types.CHANGE_WIDTH_AND_HEIGHT] = function (data) { return ({ data: data }); },
    _a)), _b.welcomePage), changeIsMobile = _b.changeIsMobile, changeWidthAndHeight = _b.changeWidthAndHeight;
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
export function initEnvironment() {
    return function (dispatch) {
        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            document.body.style.overflow = 'hidden';
        }
        dispatch(changeIsMobile(isMobile));
        dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));
        window.onresize = function () {
            dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));
        };
    };
}
