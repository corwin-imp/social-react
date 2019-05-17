import * as tslib_1 from "tslib";
import * as types from '../../constants/ActionTypes-items';
import url from 'url';
var initialState = {
    music: [],
    pictures: []
};
export default function audio(state, action) {
    if (state === void 0) { state = initialState; }
    function getMusicName(value) {
        var path_parts = url.parse(value).path.split('/');
        var songName = decodeURIComponent(path_parts[path_parts.length - 1]);
        songName = songName.replace(/.mp3/g, '');
        return songName;
    }
    function getName(value) {
        var path_parts = url.parse(value).path.split('/');
        return decodeURIComponent(path_parts[path_parts.length - 1]);
    }
    switch (action.type) {
        case types.GET_MUSIC:
            var files_1 = [];
            action.files.map(function (value, index) {
                files_1[index] = {
                    href: value,
                    name: getMusicName(value),
                };
            });
            return tslib_1.__assign({}, state, { music: files_1 });
            break;
        case types.GET_PICTURES:
            var pictures_1 = [];
            action.files.map(function (value, index) {
                pictures_1[index] = {
                    src: value,
                    name: getName(value),
                };
            });
            return tslib_1.__assign({}, state, { pictures: pictures_1 });
            break;
        case types.REMOVE_FILE:
            console.log('files', state[action.typeFile]);
            var Upfiles = Object.assign([], state[action.typeFile]);
            console.log('up', action.file);
            Upfiles.splice(action.file, 1);
            var newState = tslib_1.__assign({}, state);
            newState[action.typeFile] = Upfiles;
            console.log('state', newState);
            return newState;
            break;
        default:
            return state;
            break;
    }
}
