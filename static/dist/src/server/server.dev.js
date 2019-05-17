"use strict";
import express from "express";
import path from "path";
var fs = require("fs");
import mongoose from "mongoose";
import { StaticRouter } from 'react-router';
import { renderToString } from "react-dom/server";
import React from "react";
import { Provider } from "react-redux";
import Routes from "../common/routes.js";
import store from "../common/store/configureStore";
import webpack from "webpack";
import webpackConfig from "../../webpack.config.dev";
var compiler = webpack(webpackConfig);
import passport from "passport";
require("../../config/passport")(passport);
import config from "../../config/config";
import SocketIo from "socket.io";
import DevTools from "../common/containers/DevTools";
var app = express();
var fileUpload = require("express-fileupload");
var _a = config.db, nameBase = _a.nameBase, portBase = _a.portBase, hostUser = _a.hostUser;
console.log("dbb", hostUser);
var corsAnywhere = require("cors-anywhere");
process.env.MONGOLAB_URI =
    process.env.MONGOLAB_URI || "mongodb://" + hostUser + ":" + portBase + "/" + nameBase;
process.env.PORT = process.env.PORT || 3000;
var port = process.env.PORT || process.env.PORT || 3000;
// connect our DB
mongoose.connect(process.env.MONGOLAB_URI, {
    useMongoClient: true
    /* other options */
}, function (err) {
    if (err) {
        console.log("err", err);
    }
});
var proxy = corsAnywhere.createServer({
    originWhitelist: [],
    requireHeaders: [],
    removeHeaders: [] // Do not remove any headers.
});
/* Attach our cors proxy to the existing API on the /proxy endpoint. */
app.get("/proxy/:proxyUrl*", function (req, res) {
    req.url = req.url.replace("/proxy/", "/"); // Strip '/proxy' from the front of the URL, else the proxy won't work.
    proxy.emit("request", req, res);
});
process.on("uncaughtException", function (err) {
    //what is непойманный исключение
    console.log(err);
});
//app.use(cors());
app.use(passport.initialize());
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));
app.use(fileUpload());
//load routers
var messageRouter = express.Router();
var usersRouter = express.Router();
var channelRouter = express.Router();
var profilesRouter = express.Router();
var ftpRouter = express.Router();
require("./routes/message_routes")(messageRouter);
require("./routes/channel_routes")(channelRouter);
require("./routes/profiles_routes")(profilesRouter);
require("./routes/ftp_routes")(ftpRouter);
require("./routes/user_routes")(usersRouter, passport);
app.use("/api", messageRouter);
app.use("/api", usersRouter);
app.use("/api", channelRouter);
app.use("/api", profilesRouter);
app.use("/ftp", ftpRouter);
import extractLocalesFromReq from './client-locale/extractLocalesFromReq';
import guessLocale from './client-locale/guessLocale';
app.use("/", express.static(path.join(__dirname, "..", "static")));
/*app.get("/!*", function(req, res) {

  const InitialView = (Provider);
  const finalState = store.getState();
  const html = renderToString(InitialView);
  //res.send(renderFullPage(html, finalState));
   res.status(200).end(renderFullPage(html, finalState))
});*/
module.exports = function render(initialState) {
    if (initialState === void 0) { initialState = {}; }
    // Model the initial state
    var userLocales = extractLocalesFromReq(req);
    var lang = guessLocale(['de', 'en'], userLocales, 'en');
    if (req.originalUrl.substr(1, 2) == 'de') {
        lang = 'de';
    }
    if (req.originalUrl.substr(1, 2) == 'en') {
        lang = 'en';
    }
    var content = renderToString(React.createElement(Provider, { store: store },
        React.createElement("div", { style: { height: "100%" } },
            process.env.NODE_ENV !== "production" && React.createElement(DevTools, null),
            React.createElement(StaticRouter, { location: req.originalUrl, context: context },
                React.createElement(Routes, { lang: lang })))));
    var preloadedState = store.getState();
    return { content: content, preloadedState: preloadedState };
};
var server = app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("server listening on port: %s", process.env.PORT);
});
var io = new SocketIo(server, { path: "/api/chat" });
var socketEvents = require("./socketEvents")(io);
function renderFullPage(html) {
    return "\n    <!doctype html>\n    <html lang=\"en\">\n      <head>\n        <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css\" />\n        <link href=\"https://use.fontawesome.com/releases/v5.0.6/css/all.css\" rel=\"stylesheet\">\n        <link rel=\"icon\" href=\"./favicon.ico\" type=\"image/x-icon\" />\n        <link rel=\"stylesheet\" type=\"text/css\" href=\"/dist/bundle.css\">\n        <meta charset=\"utf-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0\" />\n        <title>React Redux Socket.io Chat</title>\n      </head>\n      <body>\n        <container id=\"react\">" + html + "</container>\n        <script src=\"/dist/bundle.js\"></script>\n      </body>\n    </html>\n  ";
}
