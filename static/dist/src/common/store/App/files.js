"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const types = tslib_1.__importStar(require("../../constants/ActionTypes-items"));
const url_1 = tslib_1.__importDefault(require("url"));
const initialState = {
    music: [],
    pictures: []
};
function audio(state = initialState, action) {
    function getMusicName(value) {
        var path_parts = url_1.default.parse(value).path.split('/');
        let songName = decodeURIComponent(path_parts[path_parts.length - 1]);
        songName = songName.replace(/.mp3/g, '');
        return songName;
    }
    function getName(value) {
        var path_parts = url_1.default.parse(value).path.split('/');
        return decodeURIComponent(path_parts[path_parts.length - 1]);
    }
    switch (action.type) {
        case types.GET_MUSIC:
            let files = [];
            action.files.map((value, index) => {
                files[index] = {
                    href: value,
                    name: getMusicName(value),
                };
            });
            return {
                ...state,
                music: files
            };
            break;
        case types.GET_PICTURES:
            let pictures = [];
            action.files.map((value, index) => {
                pictures[index] = {
                    src: value,
                    name: getName(value),
                };
            });
            return {
                ...state,
                pictures: pictures,
            };
            break;
        case types.REMOVE_FILE:
            console.log('files', state[action.typeFile]);
            var Upfiles = Object.assign([], state[action.typeFile]);
            console.log('up', action.file);
            Upfiles.splice(action.file, 1);
            let newState = {
                ...state,
            };
            newState[action.typeFile] = Upfiles;
            console.log('state', newState);
            return newState;
            break;
        default:
            return state;
            break;
    }
}
exports.default = audio;
