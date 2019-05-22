"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const redux_actions_1 = require("redux-actions");
const actions = tslib_1.__importStar(require("./actionsApp"));
const reducerApp = redux_actions_1.handleActions({
    [actions.welcomePage]: (state, action) => ({ userName: action.data }),
    [actions.changeIsMobile]: (state, action) => ({ isMobile: action.data }),
    [actions.changeWidthAndHeight]: (state, action) => ({ isMobile: action.data })
}, { userName: "", isMobile: false });
exports.default = reducerApp;
