"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const types = tslib_1.__importStar(require("./TypesAudio"));
const redux_actions_1 = require("redux-actions");
exports.onPlayerNext = redux_actions_1.createAction(types.ON_PLAYER_NEXT, (data) => ({ data }));
exports.onPlayerPrev = redux_actions_1.createAction(types.ON_PLAYER_PREV, (data) => ({ data }));
exports.handleToggle = redux_actions_1.createAction(types.HANDLE_TOGGLE, (data) => ({ data }));
exports.load = redux_actions_1.createAction(types.LOAD, (data) => ({ data }));
exports.setProgress = redux_actions_1.createAction(types.SET_PROGRESS, (prog, sk) => ({ progress: prog,
    seek: sk, }));
exports.handleOnLoad = redux_actions_1.createAction(types.HANDLE_ON_LOAD, (data) => ({ data }));
exports.volume = redux_actions_1.createAction(types.VOLUME, (data) => ({ data }));
exports.renderSeekPos = redux_actions_1.createAction(types.RENDER_SEEK_POS, (data) => ({ data }));
exports.trigMount = redux_actions_1.createAction(types.TRIG_MOUNT, (data) => ({ data }));
