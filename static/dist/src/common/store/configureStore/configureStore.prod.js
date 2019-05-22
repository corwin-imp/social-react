"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const redux_1 = require("redux");
const RootReducer_1 = tslib_1.__importDefault(require("../RootReducer"));
const redux_thunk_1 = tslib_1.__importDefault(require("redux-thunk"));
const promiseMiddleware_1 = tslib_1.__importDefault(require("../../middleware/promiseMiddleware"));
const finalCreateStore = redux_1.compose(redux_1.applyMiddleware(redux_thunk_1.default, promiseMiddleware_1.default))(redux_1.createStore);
function configureStore(initialState) {
    return finalCreateStore(RootReducer_1.default, initialState);
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
