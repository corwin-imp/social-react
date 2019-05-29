import { createActions, createAction, handleActions, combineActions } from 'redux-actions';
import { take, fork } from 'redux-saga/effects';

export const createSignalAction = function(reducerName: string, base:string) {
    return ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((prev:any, curr, index) => {
        prev[curr] = `SIGNAL_${reducerName}_${base}_${curr}`;
        prev[curr.toLowerCase()] = createActionCreator(prev[curr]);
        return prev;
    }, {})
};

export const createDeltaAction = function(reducerName: string, base:string) {
    return `DELTA/${reducerName}/${base}`;
};

export const createActionCreator = function(action: any) {
    return function(arg:any) {
        const actionCreate = createAction(action)
        actionCreate(arg)
        return actionCreate
    }
}

export const createWatcher = function(action:any, fn:any) {
    return function* () {
        while(true) {
            const { data } = yield take(action);
            yield fork(fn, data);
        }
    }
}
