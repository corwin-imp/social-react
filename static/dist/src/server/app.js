import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { origin } from './env';
var app = express();
app.use(cors({ credentials: true, origin: origin }));
app.use(bodyParser.json());
app.use(cookieParser());
var expressStaticGzip = require('express-static-gzip');
import webpack from 'webpack';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import configDevClient from '../../config/webpack.dev-client.js';
import configDevServer from '../../config/webpack.dev-server.js';
import configProdClient from '../../config/webpack.prod-client.js';
import configProdServer from '../../config/webpack.prod-server.js';
var isProd = process.env.NODE_ENV === 'production';
var isDev = !isProd;
var isBuilt = false;
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
var done = function () {
    !isBuilt && console.log('Done');
};
if (isDev) {
    var compiler = webpack([configDevClient, configDevServer]);
    var clientCompiler = compiler.compilers[0];
    var serverCompiler = compiler.compilers[1];
    var webpackDevMiddleware = require('webpack-dev-middleware')(compiler, configDevClient.devServer);
    var webpackHotMiddlware = require('webpack-hot-middleware')(clientCompiler, configDevClient.devServer);
    app.use(webpackDevMiddleware);
    app.use(webpackHotMiddlware);
    app.use('/app', webpackHotServerMiddleware(compiler));
    console.log('Middleware enabled');
    done();
}
else {
    webpack([configProdClient, configProdServer]).run(function (err, stats) {
        var clientStats = stats.toJson().children[0];
        var render = require('../../build/prod-server-bundle.js').default;
        console.log(stats.toString({
            colors: true,
        }));
        app.use(expressStaticGzip('dist', {
            enableBrotli: true,
        }));
        app.use(render({ clientStats: clientStats }));
        done();
    });
}
export { app };
