"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const redux_1 = require("redux");
const promiseMiddleware_1 = tslib_1.__importDefault(require("../../middleware/promiseMiddleware"));
const DevTools_1 = tslib_1.__importDefault(require("../../containers/DevTools"));
const redux_thunk_1 = tslib_1.__importDefault(require("redux-thunk"));
const RootReducer_1 = tslib_1.__importDefault(require("../RootReducer"));
const finalCreateStore = redux_1.compose(redux_1.applyMiddleware(redux_thunk_1.default, promiseMiddleware_1.default), DevTools_1.default.instrument())(redux_1.createStore);
function configureStore(initialState = {}) {
    const store = finalCreateStore(RootReducer_1.default, initialState);
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../RootReducer', () => {
            const nextRootReducer = require('../RootReducer');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
const initialState = {
    auth: {
        user: {
            username: 'tester123',
            id: 0,
            socketID: null,
        },
    },
};
exports.default = configureStore(initialState);
