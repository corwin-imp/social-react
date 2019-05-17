import * as tslib_1 from "tslib";
import { createAction } from 'redux-actions';
import { take, fork } from 'redux-saga/effects';
export var createSignalAction = function (reducerName, base) {
    return ['REQUEST', 'SUCCESS', 'FAILURE'].reduce(function (prev, curr, index) {
        prev[curr] = "SIGNAL_" + reducerName + "_" + base + "_" + curr;
        prev[curr.toLowerCase()] = createActionCreator(prev[curr]);
        return prev;
    }, {});
};
export var createDeltaAction = function (reducerName, base) {
    return "DELTA/" + reducerName + "/" + base;
};
export var createActionCreator = function (action) {
    return function (arg) {
        var actionCreate = createAction(action);
        actionCreate(arg);
        return actionCreate;
    };
};
export var createWatcher = function (action, fn) {
    return function () {
        var data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!true) return [3 /*break*/, 3];
                    return [4 /*yield*/, take(action)];
                case 1:
                    data = (_a.sent()).data;
                    return [4 /*yield*/, fork(fn, data)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 0];
                case 3: return [2 /*return*/];
            }
        });
    };
};
