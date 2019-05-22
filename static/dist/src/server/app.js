"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const env_1 = require("./env");
const app = express_1.default();
exports.app = app;
app.use(cors_1.default({ credentials: true, origin: env_1.origin }));
app.use(body_parser_1.default.json());
app.use(cookie_parser_1.default());
const expressStaticGzip = require('express-static-gzip');
const webpack_1 = tslib_1.__importDefault(require("webpack"));
const webpack_hot_server_middleware_1 = tslib_1.__importDefault(require("webpack-hot-server-middleware"));
const webpack_dev_client_js_1 = tslib_1.__importDefault(require("../../config/webpack.dev-client.js"));
const webpack_dev_server_js_1 = tslib_1.__importDefault(require("../../config/webpack.dev-server.js"));
const webpack_prod_client_js_1 = tslib_1.__importDefault(require("../../config/webpack.prod-client.js"));
const webpack_prod_server_js_1 = tslib_1.__importDefault(require("../../config/webpack.prod-server.js"));
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
let isBuilt = false;
/*
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    isBuilt = true;
    console.log(
        `Server listening on \x1b[42m\x1b[1mhttp://localhost:${PORT}\x1b[0m in \x1b[41m${
            process.env.NODE_ENV
        }\x1b[0m 🌎...`
    );
});*/
const done = () => {
    !isBuilt && console.log('Done');
};
if (isDev) {
    const configs = [webpack_dev_client_js_1.default, webpack_dev_server_js_1.default];
    const compiler = webpack_1.default(configs);
    const clientCompiler = compiler.compilers[0];
    const serverCompiler = compiler.compilers[1];
    const webpackDevMiddleware = require('webpack-dev-middleware')(compiler);
    const webpackHotMiddlware = require('webpack-hot-middleware')(clientCompiler);
    app.use(webpackDevMiddleware);
    app.use(webpackHotMiddlware);
    app.use('/app', webpack_hot_server_middleware_1.default(compiler));
    console.log('Middleware enabled');
    done();
}
else {
    const configs = [webpack_prod_client_js_1.default, webpack_prod_server_js_1.default];
    webpack_1.default(configs).run((err, stats) => {
        const clientStats = stats.toJson().children[0];
        const render = require('../../build/prod-server-bundle.js').default;
        console.log(stats.toString({
            colors: true,
        }));
        app.use(expressStaticGzip('dist', {
            enableBrotli: true,
        }));
        app.use(render({ clientStats }));
        done();
    });
}
