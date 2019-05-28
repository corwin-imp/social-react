"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Routing_1 = require("../constants/Routing");
const history_1 = tslib_1.__importDefault(require("./history"));
exports.redirect = store => next => action => {
    //eslint-disable-line no-unused-vars
    if (action.type === Routing_1.ROUTING) {
        console.log('act', action.payload.nextUrl);
        console.log('rou', action.payload.method);
        history_1.default.push('/devices');
    }
    return next(action);
};
