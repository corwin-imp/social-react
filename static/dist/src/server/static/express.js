"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const server = express_1.default();
server.use(cookie_parser_1.default());
const expressStaticGzip = require('express-static-gzip');
const webpack_1 = tslib_1.__importDefault(require("webpack"));
const webpack_hot_server_middleware_1 = tslib_1.__importDefault(require("webpack-hot-server-middleware"));
const webpack_dev_client_js_1 = tslib_1.__importDefault(require("../../config/webpack.dev-client.js"));
const webpack_dev_server_js_1 = tslib_1.__importDefault(require("../../config/webpack.dev-server.js"));
const webpack_prod_client_js_1 = tslib_1.__importDefault(require("../../config/webpack.prod-client.js"));
const webpack_prod_server_js_1 = tslib_1.__importDefault(require("../../config/webpack.prod-server.js"));
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const PORT = process.env.PORT || 8080;
let isBuilt = false;
server.listen(PORT, () => {
    isBuilt = true;
    console.log(`Server listening on \x1b[42m\x1b[1mhttp://localhost:${PORT}\x1b[0m in \x1b[41m${process.env.NODE_ENV}\x1b[0m 🌎...`);
});
const done = () => {
    !isBuilt && console.log('Done');
};
if (isDev) {
    const compiler = webpack_1.default([webpack_dev_client_js_1.default, webpack_dev_server_js_1.default]);
    const clientCompiler = compiler.compilers[0];
    const serverCompiler = compiler.compilers[1];
    const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, webpack_dev_client_js_1.default.devServer);
    const webpackHotMiddlware = require('webpack-hot-middleware')(clientCompiler, webpack_dev_client_js_1.default.devServer);
    server.use(webpackDevMiddleware);
    server.use(webpackHotMiddlware);
    server.use(webpack_hot_server_middleware_1.default(compiler));
    console.log('Middleware enabled');
    done();
}
else {
    webpack_1.default([webpack_prod_client_js_1.default, webpack_prod_server_js_1.default]).run((err, stats) => {
        const clientStats = stats.toJson().children[0];
        const render = require('../../build/prod-server-bundle.js').default;
        console.log(stats.toString({
            colors: true,
        }));
        server.use(expressStaticGzip('dist', {
            enableBrotli: true,
        }));
        server.use(render({ clientStats }));
        done();
    });
}
