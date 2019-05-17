import express from 'express';
import cookieParser from 'cookie-parser';
var server = express();
server.use(cookieParser());
var expressStaticGzip = require('express-static-gzip');
import webpack from 'webpack';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import configDevClient from '../../config/webpack.dev-client.js';
import configDevServer from '../../config/webpack.dev-server.js';
import configProdClient from '../../config/webpack.prod-client.js';
import configProdServer from '../../config/webpack.prod-server.js';
var isProd = process.env.NODE_ENV === 'production';
var isDev = !isProd;
var PORT = process.env.PORT || 8080;
var isBuilt = false;
server.listen(PORT, function () {
    isBuilt = true;
    console.log("Server listening on \u001B[42m\u001B[1mhttp://localhost:" + PORT + "\u001B[0m in \u001B[41m" + process.env.NODE_ENV + "\u001B[0m \uD83C\uDF0E...");
});
var done = function () {
    !isBuilt && console.log('Done');
};
if (isDev) {
    var compiler = webpack([configDevClient, configDevServer]);
    var clientCompiler = compiler.compilers[0];
    var serverCompiler = compiler.compilers[1];
    var webpackDevMiddleware = require('webpack-dev-middleware')(compiler, configDevClient.devServer);
    var webpackHotMiddlware = require('webpack-hot-middleware')(clientCompiler, configDevClient.devServer);
    server.use(webpackDevMiddleware);
    server.use(webpackHotMiddlware);
    server.use(webpackHotServerMiddleware(compiler));
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
        server.use(expressStaticGzip('dist', {
            enableBrotli: true,
        }));
        server.use(render({ clientStats: clientStats }));
        done();
    });
}
