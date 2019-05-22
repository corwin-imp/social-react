"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const de_1 = tslib_1.__importDefault(require("./de"));
const en_1 = tslib_1.__importDefault(require("./en"));
const language = 'de';
const translationsDe = {
    ...de_1.default,
};
const translationsEn = {
    ...en_1.default,
};
const t = (lang, key, params) => {
    const langTranslations = lang === 'de' ? translationsDe : translationsEn;
    const translation = key
        .split('.')
        .reduce((acc, currKey) => (acc ? acc[currKey] : undefined), langTranslations);
    if (typeof translation !== 'string') {
        console.warn('No translation found for', key);
        return key;
    }
    if (params) {
        return translation.replace(/\$\{\w+\}/g, match => {
            const param = match.substring(2, match.length - 1);
            return params[param] || match;
        });
    }
    return translation;
};
exports.t = t;
