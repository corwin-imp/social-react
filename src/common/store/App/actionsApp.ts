import * as types from "./AppTypes";
import { Dispatch, AnyAction } from 'redux'
import { createActions, createAction, handleActions, combineActions } from 'redux-actions';
//import { createSignalAction } from "../typeSettings";


export const {welcomePage, changeIsMobile, changeWidthAndHeight}= createActions({
    [types.SAVE_USERNAME]: (data: AnyAction) => ({ data }), // payload creator
    [types.CHANGE_IS_MOBILE]: (data: AnyAction) => ({ data }),
    [types.CHANGE_WIDTH_AND_HEIGHT]: (data: AnyAction) => ({ data }),
});



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
    return (dispatch: Dispatch) => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        )
        if (isMobile) {
            document.body.style.overflow = 'hidden'
        }

        dispatch(changeIsMobile(isMobile))
        dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth))

        window.onresize = () => {
            dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth))
        }
    }
}
