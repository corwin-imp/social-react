"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const messages_1 = tslib_1.__importDefault(require("./Chat/messages"));
const channels_1 = tslib_1.__importDefault(require("./Chat/channels"));
const activeChannel_1 = tslib_1.__importDefault(require("./Chat/activeChannel"));
const reducerAuth_1 = tslib_1.__importDefault(require("./Auth/reducerAuth"));
const typers_1 = tslib_1.__importDefault(require("./Chat/typers"));
const files_1 = tslib_1.__importDefault(require("./App/files"));
const reducerProfile_1 = tslib_1.__importDefault(require("./Profile/reducerProfile"));
const reducerAudio_1 = tslib_1.__importDefault(require("./Audio/reducerAudio"));
const reducerVideo_1 = tslib_1.__importDefault(require("./Video/reducerVideo"));
const welcomePage_1 = tslib_1.__importDefault(require("./App/welcomePage"));
const userValidation_1 = tslib_1.__importDefault(require("./App/userValidation"));
const environment_1 = tslib_1.__importDefault(require("./App/environment"));
const redux_1 = require("redux");
const redux_form_1 = require("redux-form");
const rootReducer = redux_1.combineReducers({
    messages: messages_1.default,
    channels: channels_1.default,
    activeChannel: activeChannel_1.default,
    auth: reducerAuth_1.default,
    files: files_1.default,
    typers: typers_1.default,
    audio: reducerAudio_1.default,
    reducerItems: reducerProfile_1.default,
    reducerVideo: reducerVideo_1.default,
    welcomePage: welcomePage_1.default,
    userValidation: userValidation_1.default,
    environment: environment_1.default,
    formReducer: redux_form_1.reducer,
});
exports.default = rootReducer;
