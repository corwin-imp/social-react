"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
const effects_1 = require("redux-saga/effects");
exports.createSignalAction = function (reducerName, base) {
    return ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((prev, curr, index) => {
        prev[curr] = `SIGNAL_${reducerName}_${base}_${curr}`;
        prev[curr.toLowerCase()] = exports.createActionCreator(prev[curr]);
        return prev;
    }, {});
};
exports.createDeltaAction = function (reducerName, base) {
    return `DELTA/${reducerName}/${base}`;
};
exports.createActionCreator = function (action) {
    return function (arg) {
        const actionCreate = redux_actions_1.createAction(action);
        actionCreate(arg);
        return actionCreate;
    };
};
exports.createWatcher = function (action, fn) {
    return function* () {
        while (true) {
            const { data } = yield effects_1.take(action);
            yield effects_1.fork(fn, data);
        }
    };
};
