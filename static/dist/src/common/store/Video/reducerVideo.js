"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const types = tslib_1.__importStar(require("../../constants/ActionTypes-items"));
const initialState = {
    video: [],
    deleted: false,
};
const reducerVideo = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_VIDEO:
            let newVideo = { name: action.name, href: action.src };
            let videoIn = Object.assign({}, state.video);
            videoIn[action.id] = newVideo;
            return {
                ...state,
                video: videoIn,
            };
            break;
        case types.DEL_VIDEO:
            let videos = [];
            Object.keys(state.video).map(function (key, index) {
                console.log('i', key);
                if (key == action.id) {
                }
                else {
                    videos[key] = state.video[key];
                }
            });
            return {
                ...state,
                video: videos,
            };
            break;
        case types.GET_VIDEO: // another reducerApp
            let newState = {
                ...state,
                video: state.video,
            };
            let dev = action.video;
            if (typeof dev != 'string') {
                let baseS = [];
                action.video.forEach(function (item, i, arr) {
                    let newv = { name: item.name, href: item.src };
                    //  newItems.set(item._id, newItem);
                    baseS[item['_id']] = newv;
                });
                console.info('devVideo', baseS);
                newState = {
                    video: baseS,
                };
            }
            return newState;
            break;
        default:
            if (state.video == []) {
                reducerVideo(initialState, { type: types.GET_VIDEO });
            }
            return state;
    }
};
exports.default = reducerVideo;
