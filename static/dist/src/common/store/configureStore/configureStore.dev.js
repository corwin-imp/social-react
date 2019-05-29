"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const redux_1 = require("redux");
const redux_saga_1 = tslib_1.__importDefault(require("redux-saga"));
//import DevTools from '../../containers/DevTools'
const redux_devtools_extension_1 = require("redux-devtools-extension");
const redux_thunk_1 = tslib_1.__importDefault(require("redux-thunk"));
const randomId_1 = tslib_1.__importDefault(require("../../middlewares/randomId"));
const index_1 = tslib_1.__importDefault(require("../../sagas/index"));
const RootReducer_1 = tslib_1.__importDefault(require("../RootReducer"));
const sagaMiddleware = redux_saga_1.default();
const middlewares = [sagaMiddleware];
const enhancer = redux_devtools_extension_1.composeWithDevTools({})(redux_1.applyMiddleware(...middlewares, redux_thunk_1.default, randomId_1.default));
function configureStore(initialState = {}) {
    const store = redux_1.createStore(RootReducer_1.default, initialState, enhancer);
    sagaMiddleware.run(index_1.default);
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
