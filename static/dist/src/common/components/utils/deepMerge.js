function deepMerge(target, source) {
    if (source === void 0) { source = {}; }
    var extended = Object.assign({}, target);
    Object.keys(source).forEach(function (key) {
        if (typeof source[key] !== 'object' || !source[key]) {
            extended[key] = source[key];
        }
        else {
            if (!target[key]) {
                extended[key] = source[key];
            }
            else {
                extended[key] = deepMerge(target[key], source[key]);
            }
        }
    });
    return extended;
}
export default deepMerge;
