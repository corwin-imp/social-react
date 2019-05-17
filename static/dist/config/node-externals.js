var fs = require('fs');
var path = require('path');
var res = function (p) { return path.resolve(__dirname, p); };
var nodeModules = res('../node_modules');
var externals = fs
    .readdirSync(nodeModules)
    .filter(function (x) { return !/\.bin|react-universal-component|webpack-flush-chunks/.test(x); })
    .reduce(function (externals, mod) {
    externals[mod] = "commonjs " + mod;
    return externals;
}, {});
externals['react-dom/server'] = 'commonjs react-dom/server';
module.exports = externals;
