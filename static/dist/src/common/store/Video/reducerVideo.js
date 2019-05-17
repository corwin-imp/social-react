import * as tslib_1 from "tslib";
import * as types from '../../constants/ActionTypes-items';
var initialState = {
    video: [],
    deleted: false,
};
var reducerVideo = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case types.ADD_VIDEO:
            var newVideo = { name: action.name, href: action.src };
            var videoIn = Object.assign({}, state.video);
            videoIn[action.id] = newVideo;
            return tslib_1.__assign({}, state, { video: videoIn });
            break;
        case types.DEL_VIDEO:
            var videos_1 = [];
            Object.keys(state.video).map(function (key, index) {
                console.log('i', key);
                if (key == action.id) {
                }
                else {
                    videos_1[key] = state.video[key];
                }
            });
            return tslib_1.__assign({}, state, { video: videos_1 });
            break;
        case types.GET_VIDEO: // another reducerApp
            var newState = tslib_1.__assign({}, state, { video: state.video });
            var dev = action.video;
            if (typeof dev != 'string') {
                var baseS = [];
                action.video.forEach(function (item, i, arr) {
                    var newv = { name: item.name, href: item.src };
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
                reducerVideo({ type: types.GET_VIDEO });
            }
            return state;
    }
};
export default reducerVideo;
