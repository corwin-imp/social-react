"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const env_1 = require("./env");
const router_1 = require("./router");
const app = express_1.default();
exports.app = app;
app.use(cors_1.default({ credentials: true, origin: env_1.origin }));
app.use(body_parser_1.default.json());
app.use(cookie_parser_1.default());
const react_loadable_1 = tslib_1.__importDefault(require("react-loadable"));
const expressStaticGzip = require('express-static-gzip');
const webpack_1 = tslib_1.__importDefault(require("webpack"));
const path_1 = tslib_1.__importDefault(require("path"));
const configDevClient = require('../../config/webpack.dev-client.js').default;
const configDevServer = require('../../config/webpack.dev-server.js').default;
const configProdClient = require('../../config/webpack.prod-client.js').default;
const configProdServer = require('../../config/webpack.prod-server.js').default;
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
let isBuilt = false;
const configDev = configDevClient;
const done = () => {
    !isBuilt && console.log('Done');
};
// register routes
const configs = [configDevClient, configDevServer];
exports.compiler = webpack_1.default(configs);
app.use("/static/", express_1.default.static(path_1.default.resolve(__dirname, "../src/public")));
if (isDev) {
    const clientCompiler = exports.compiler.compilers[0];
    const serverCompiler = exports.compiler.compilers[1];
    app.use(webpackDevMiddleware(exports.compiler, {
        publicPath: '/static/',
        serverSideRender: true,
    }));
    app.use(webpackHotMiddleware(clientCompiler));
    let started = false;
    // tslint:disable-next-line:no-console
    console.log("Compiling:....");
    exports.compiler.plugin("done", () => {
        if (!started) {
            started = true;
            startServer();
        }
    });
    console.log('Middleware enabled');
    router_1.router(app);
}
else {
    const configs = [configProdClient, configProdServer];
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
function startServer() {
    react_loadable_1.default.preloadAll()
        .then(() => {
        app.listen(4000, (err) => {
            if (err) {
                // tslint:disable-next-line:no-console
                return console.error(err);
            }
            // tslint:disable-next-line:no-console
            console.log(`running at http://localhost:4000`);
            // tslint:disable-next-line:no-console
            console.log(`environemt: dev`);
        });
    });
}
