import * as types from './TypesAudio'
import {createAction} from "redux-actions";

export const onPlayerNext = createAction(types.ON_PLAYER_NEXT, (data: any) => ({ data }));
export const onPlayerPrev = createAction(types.ON_PLAYER_PREV, (data: any) => ({ data }));
export const handleToggle = createAction(types.HANDLE_TOGGLE, (data: any) => ({ data }));
export const load = createAction(types.LOAD, (data: any) => ({ data }));
export const setProgress = createAction(types.SET_PROGRESS, (prog:any, sk:any) => ({ progress: prog,
    seek: sk, }));
export const handleOnLoad = createAction(types.HANDLE_ON_LOAD, (data: any) => ({ data }));
export const volume = createAction(types.VOLUME, (data: any) => ({ data }));
export const renderSeekPos = createAction(types.RENDER_SEEK_POS, (data: any) => ({ data }));
export const trigMount = createAction(types.TRIG_MOUNT,(data: any) => ({ data }));
