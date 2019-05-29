"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const redux_actions_1 = require("redux-actions");
const actions = tslib_1.__importStar(require("./actionsAudio"));
const initialState = {
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
const reducerAudio = redux_actions_1.handleActions({
    [`${actions.onPlayerNext}`]: (state) => {
        state.history.push(state.src);
        return {
            ...state,
            src: ++state.src,
            seek: false,
            history: state.history,
        };
    },
    [`${actions.onPlayerPrev}`]: (state, action) => {
        let src = state.history.pop();
        return {
            ...state,
            seek: false,
            src: src,
        };
    },
    [`${actions.handleToggle}`]: (state, action) => {
        return {
            ...state,
            playing: !state.playing,
            keyWord: 'playing',
        };
    },
    [`${actions.load}`]: (state, action) => {
        if (state.src !== action.data) {
            var pl = true;
        }
        else if (state.src == action.data && state.playing) {
            var pl = false;
        }
        else if (state.src == action.data && !state.playing) {
            var pl = true;
        }
        return {
            ...state,
            src: action.data,
            seek: false,
            playing: pl,
            keyWord: 'playing',
        };
    },
    [`${actions.setProgress}`]: (state, action) => {
        return {
            ...state,
            progress: action.progress,
            seek: action.seek,
            keyWord: 'progress',
        };
    },
    [`${actions.handleOnLoad}`]: (state, action) => {
        return {
            ...state,
            duration: action.data,
        };
    },
    [`${actions.volume}`]: (state, action) => {
        return {
            ...state,
            volume: action.data,
        };
    },
    [`${actions.renderSeekPos}`]: (state, action) => {
        return {
            ...state,
            seek: action.data,
        };
    },
    [`${actions.trigMount}`]: (state, action) => {
        return {
            ...state,
            mount: !state.mount,
        };
    },
}, initialState);
exports.default = reducerAudio;
