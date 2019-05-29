"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const configureStore_dev_1 = tslib_1.__importDefault(require("./configureStore.dev"));
const configureStore_prod_1 = tslib_1.__importDefault(require("./configureStore.prod"));
let store = configureStore_dev_1.default;
if (process.env.NODE_ENV === 'production') {
    let store = configureStore_prod_1.default;
}
exports.default = store;
