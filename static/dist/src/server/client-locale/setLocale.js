"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
function setLocale(locale) {
    if (typeof window !== 'undefined') {
        window.document.cookie = `${constants_1.LOCALE_COOKIE_NAME}=${locale};path=/;max-age=${constants_1.COOKIE_MAX_AGE}`;
    }
}
exports.default = setLocale;
