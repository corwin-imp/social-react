import { createActions, createAction, handleActions, combineActions } from 'redux-actions';
import { take, fork } from 'redux-saga/effects';

export const createSignalAction = function(reducerName, base) {
    return ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((prev, curr, index) => {
        prev[curr] = `SIGNAL_${reducerName}_${base}_${curr}`;
        prev[curr.toLowerCase()] = createActionCreator(prev[curr]);
        return prev;
    }, {})
};

export const createDeltaAction = function(reducerName, base) {
    return `DELTA/${reducerName}/${base}`;
};

export const createActionCreator = function(action) {
    return function(arg) {
        const actionCreate = createAction(action)
        actionCreate(arg)
        return actionCreate
    }
}

export const createWatcher = function(action, fn) {
    return function* () {
        while(true) {
            const { data } = yield take(action);
            yield fork(fn, data);
        }
    }
}