"use strict";
import express from "express";
import path from "path";
var fs = require("fs");
import mongoose from "mongoose";
import webpack from "webpack";
import webpackConfig from "../../webpack.config.dev";
var compiler = webpack(webpackConfig);
import passport from "passport";
require("../../config/passport")(passport);
import config from "../../config/config";
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
app.use("/", express.static(path.join(__dirname, "..", "static")));
