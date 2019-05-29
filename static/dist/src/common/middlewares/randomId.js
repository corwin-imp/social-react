"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRandomId = () => (Date.now() + Math.random()).toString();
const randomId = (store) => (next) => (action) => {
    const { payload = {} } = action;
    const { generateId, ...rest } = payload;
    if (!generateId)
        return next(action);
    next({
        ...action,
        payload: {
            ...rest,
            randomId: getRandomId(),
        },
    });
};
exports.default = randomId;
