import * as tslib_1 from "tslib";
import de from './de';
import en from './en';
var language = 'de';
var translationsDe = tslib_1.__assign({}, de);
var translationsEn = tslib_1.__assign({}, en);
var t = function (lang, key, params) {
    var langTranslations = lang === 'de' ? translationsDe : translationsEn;
    var translation = key
        .split('.')
        .reduce(function (acc, currKey) { return (acc ? acc[currKey] : undefined); }, langTranslations);
    if (typeof translation !== 'string') {
        console.warn('No translation found for', key);
        return key;
    }
    if (params) {
        return translation.replace(/\$\{\w+\}/g, function (match) {
            var param = match.substring(2, match.length - 1);
            return params[param] || match;
        });
    }
    return translation;
};
export { t };
