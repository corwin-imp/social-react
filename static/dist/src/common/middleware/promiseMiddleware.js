import * as tslib_1 from "tslib";
// Middleware
export default function promiseMiddleware() {
    return function (next) { return function (action) {
        var promise = action.promise, types = action.types, rest = tslib_1.__rest(action, ["promise", "types"]);
        if (!promise) {
            return next(action);
        }
        var REQUEST = types[0], SUCCESS = types[1], FAILURE = types[2];
        next(tslib_1.__assign({}, rest, { type: REQUEST }));
        return promise.then(function (result) {
            next(tslib_1.__assign({}, rest, { result: result, type: SUCCESS }));
        }, function (error) {
            next(tslib_1.__assign({}, rest, { error: error, type: FAILURE }));
        });
    }; };
}
