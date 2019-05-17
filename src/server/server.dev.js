"use strict";

import express from "express";
import path from "path";
const fs = require("fs");
import mongoose from "mongoose";
import { StaticRouter } from 'react-router';
import { renderToString } from "react-dom/server";
import React from "react";
import { Provider } from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import Routes from "../common/routes.js";
import store from "../common/store/configureStore";
import {
  RouterContext,
  match,
  browserHistory
} from "react-router";

import { ConnectedRouter } from "react-router-redux";
import webpack from "webpack";
import webpackConfig from "../../webpack.config.dev";
const compiler = webpack(webpackConfig);

import passport from "passport";
require("../../config/passport")(passport);
import config from "../../config/config";

import SocketIo from "socket.io";
import DevTools from "../common/containers/DevTools";
const app = express();
const fileUpload = require("express-fileupload");
const { nameBase, portBase, hostUser } = config.db;

console.log("dbb", hostUser);

var corsAnywhere = require("cors-anywhere");
process.env.MONGOLAB_URI =
  process.env.MONGOLAB_URI || `mongodb://${hostUser}:${portBase}/${nameBase}`;
process.env.PORT = process.env.PORT || 3000
const port = process.env.PORT || process.env.PORT || 3000;


// connect our DB
mongoose.connect(
  process.env.MONGOLAB_URI,
  {
    useMongoClient: true
    /* other options */
  },
  function(err) {
    if (err) {
      console.log("err", err);
    }
  }
);

let proxy = corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeaders: [], // Do not require any headers.
  removeHeaders: [] // Do not remove any headers.
});

/* Attach our cors proxy to the existing API on the /proxy endpoint. */
app.get("/proxy/:proxyUrl*", (req, res) => {
  req.url = req.url.replace("/proxy/", "/"); // Strip '/proxy' from the front of the URL, else the proxy won't work.
  proxy.emit("request", req, res);
});

process.on("uncaughtException", function(err) {
  //what is непойманный исключение
  console.log(err);
});
//app.use(cors());
app.use(passport.initialize());

app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
);

app.use(require("webpack-hot-middleware")(compiler));
app.use(fileUpload());
//load routers
const messageRouter = express.Router();
const usersRouter = express.Router();
const channelRouter = express.Router();
const profilesRouter = express.Router();
const ftpRouter = express.Router();
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
import { LOCALE_COOKIE_NAME, COOKIE_MAX_AGE } from './client-locale/constants';
app.use("/", express.static(path.join(__dirname, "..", "static")));

/*app.get("/!*", function(req, res) {

  const InitialView = (Provider);
  const finalState = store.getState();
  const html = renderToString(InitialView);
  //res.send(renderFullPage(html, finalState));
   res.status(200).end(renderFullPage(html, finalState))
});*/



module.exports = function render(initialState={}) {
  // Model the initial state
  const userLocales = extractLocalesFromReq(req);
  let lang = guessLocale(['de', 'en'], userLocales, 'en');

  if (req.originalUrl.substr(1, 2) == 'de') {
    lang = 'de';
  }

  if (req.originalUrl.substr(1, 2) == 'en') {
    lang = 'en';
  }
  let content = renderToString(
      <Provider store={store} >
        <div style={{ height: "100%" }}>
          {process.env.NODE_ENV !== "production" && <DevTools />}
          <StaticRouter location={req.originalUrl} context={context}>
            <Routes lang={lang} />
          </StaticRouter>
        </div>
      </Provider>
  );
  const preloadedState = store.getState()
  return {content, preloadedState};
}

const server = app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("server listening on port: %s", process.env.PORT);
});

const io = new SocketIo(server, { path: "/api/chat" });
const socketEvents = require("./socketEvents")(io);

function renderFullPage(html) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
        <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" type="text/css" href="/dist/bundle.css">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <title>React Redux Socket.io Chat</title>
      </head>
      <body>
        <container id="react">${html}</container>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `;
}
