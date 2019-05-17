import * as types from './TypesAudio';
import { createAction } from "redux-actions";
export var onPlayerNext = createAction(types.ON_PLAYER_NEXT, function (data) { return ({ data: data }); });
export var onPlayerPrev = createAction(types.ON_PLAYER_PREV, function (data) { return ({ data: data }); });
export var handleToggle = createAction(types.HANDLE_TOGGLE, function (data) { return ({ data: data }); });
export var load = createAction(types.LOAD, function (data) { return ({ data: data }); });
export var setProgress = createAction(types.SET_PROGRESS, function (prog, sk) { return ({ progress: prog,
    seek: sk, }); });
export var handleOnLoad = createAction(types.HANDLE_ON_LOAD, function (data) { return ({ data: data }); });
export var volume = createAction(types.VOLUME, function (data) { return ({ data: data }); });
export var renderSeekPos = createAction(types.RENDER_SEEK_POS, function (data) { return ({ data: data }); });
export var trigMount = createAction(types.TRIG_MOUNT, function (data) { return ({ data: data }); });
