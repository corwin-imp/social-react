import * as tslib_1 from "tslib";
var _a;
import { handleActions } from 'redux-actions';
import * as actions from "./actionsAudio";
var initialState = {
    playing: false,
    src: false,
    loaded: false,
    music: [],
    loop: false,
    progress: 0,
    mount: true,
    seek: false,
    in_set_progress_mode: false,
    mute: false,
    volume: 1.0,
    keyWord: false,
    history: [],
};
var reducerAudio = handleActions((_a = {},
    _a[actions.onPlayerNext] = function (state) {
        state.history.push(state.src);
        return tslib_1.__assign({}, state, { src: ++state.src, seek: false, history: state.history });
    },
    _a[actions.onPlayerPrev] = function (state, action) {
        var src = state.history.pop();
        return tslib_1.__assign({}, state, { seek: false, src: src });
    },
    _a[actions.handleToggle] = function (state, action) {
        return tslib_1.__assign({}, state, { playing: !state.playing, keyWord: 'playing' });
    },
    _a[actions.load] = function (state, action) {
        if (state.src !== action.data) {
            var pl = true;
        }
        else if (state.src == action.data && state.playing) {
            var pl = false;
        }
        else if (state.src == action.data && !state.playing) {
            var pl = true;
        }
        return tslib_1.__assign({}, state, { src: action.data, seek: false, playing: pl, keyWord: 'playing' });
    },
    _a[actions.setProgress] = function (state, action) {
        return tslib_1.__assign({}, state, { progress: action.progress, seek: action.seek, keyWord: 'progress' });
    },
    _a[actions.handleOnLoad] = function (state, action) {
        return tslib_1.__assign({}, state, { duration: action.data });
    },
    _a[actions.volume] = function (state, action) {
        return tslib_1.__assign({}, state, { volume: action.data });
    },
    _a[actions.renderSeekPos] = function (state, action) {
        return tslib_1.__assign({}, state, { seek: action.data });
    },
    _a[actions.trigMount] = function (state, action) {
        return tslib_1.__assign({}, state, { mount: !state.mount });
    },
    _a), initialState);
export default reducerAudio;
