import * as types from './TypesAudio'
import {createAction} from "redux-actions";

export const onPlayerNext = createAction(types.ON_PLAYER_NEXT, data => ({ data }));
export const onPlayerPrev = createAction(types.ON_PLAYER_PREV, data => ({ data }));
export const handleToggle = createAction(types.HANDLE_TOGGLE, data => ({ data }));
export const load = createAction(types.LOAD, data => ({ data }));
export const setProgress = createAction(types.SET_PROGRESS, (prog, sk) => ({ progress: prog,
    seek: sk, }));
export const handleOnLoad = createAction(types.HANDLE_ON_LOAD, data => ({ data }));
export const volume = createAction(types.VOLUME, data => ({ data }));
export const renderSeekPos = createAction(types.RENDER_SEEK_POS, data => ({ data }));
export const trigMount = createAction(types.TRIG_MOUNT,data => ({ data }));
