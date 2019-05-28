"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const accepts_1 = tslib_1.__importDefault(require("accepts"));
const constants_1 = require("./constants");
function getLanguagesFromHeaders(req) {
    return accepts_1.default(req).languages();
}
function extractLocalesFromReq(req) {
    const cookieLocale = req.cookies[constants_1.LOCALE_COOKIE_NAME];
    if (cookieLocale) {
        return [cookieLocale];
    }
    return getLanguagesFromHeaders(req) || [];
}
exports.default = extractLocalesFromReq;
