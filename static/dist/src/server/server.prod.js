'use strict';
import * as tslib_1 from "tslib";
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import React from 'react';
import store from '../common/store/configureStore/configureStore';
import { RouterContext } from 'react-router';
import routes from '../common/routes';
import createHistory from 'history/createMemoryHistory';
import passport from 'passport';
require('../../config/passport')(passport);
import SocketIo from 'socket.io';
import config from '../../config/config';
var app = express();
var _a = config.db, nameBase = _a.nameBase, portBase = _a.portBase, hostUser = _a.hostUser;
var corsAnywhere = require('cors-anywhere');
var fileUpload = require('express-fileupload');
process.env.MONGOLAB_URI =
    process.env.MONGOLAB_URI || "mongodb://" + hostUser + ":" + portBase + "/" + nameBase;
process.env.PORT = process.env.PORT || 3000;
// connect our DB
mongoose.connect(process.env.MONGOLAB_URI);
process.on('uncaughtException', function (err) {
    console.log(err);
});
app.use(passport.initialize());
var proxy = corsAnywhere.createServer({
    originWhitelist: [],
    requireHeaders: [],
    removeHeaders: [],
});
/* Attach our cors proxy to the existing API on the /proxy endpoint. */
app.get('/proxy/:proxyUrl*', function (req, res) {
    req.url = req.url.replace('/proxy/', '/'); // Strip '/proxy' from the front of the URL, else the proxy won't work.
    proxy.emit('request', req, res);
});
app.use(fileUpload());
//load routers
var messageRouter = express.Router();
var usersRouter = express.Router();
var channelRouter = express.Router();
var profilesRouter = express.Router();
var ftpRouter = express.Router();
require('./routes/message_routes')(messageRouter);
require('./routes/channel_routes')(channelRouter);
require('./routes/profiles_routes')(profilesRouter);
require('./routes/ftp_routes')(ftpRouter);
require('./routes/user_routes')(usersRouter, passport);
app.use('/api', messageRouter);
app.use('/api', usersRouter);
app.use('/api', profilesRouter);
app.use('/api', channelRouter);
app.use('/ftp', ftpRouter);
app.use('/', express.static(path.join(__dirname, '../..', 'static')));
app.get('/*', function (req, res) {
    var history = createHistory();
    var location = history.location;
    match({ routes: routes, location: location }, function (err, redirectLocation, renderProps) {
        if (err) {
            console.error(err);
            return res.status(500).end('Internal server error');
        }
        if (!renderProps) {
            return res.status(404).end('Not found');
        }
        var InitialView = (React.createElement(Provider, { className: "root", store: store },
            React.createElement("div", { style: { height: '100%' } },
                React.createElement(RouterContext, tslib_1.__assign({}, renderProps)))));
        var initialState = store.getState();
        var html = renderToString(InitialView);
        res.status(200).end(renderFullPage(html, initialState));
    });
});
var server = app.listen(process.env.PORT, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('server listening on port: %s', process.env.PORT);
});
var io = new SocketIo(server, { path: '/api/chat' });
var socketEvents = require('./socketEvents')(io);
function renderFullPage(html, initialState) {
    return "\n    <!doctype html>\n    <html lang=\"en\">\n      <head>\n        <link rel=\"stylesheet\" href=\"/dist/bootstrap.min.css\" />\n        <link href=\"/dist/fontawesome-all.min.css\" type=\"text/css\" rel=\"stylesheet\">\n        <link rel=\"icon\" href=\"./favicon.ico\" type=\"image/x-icon\" />\n        <link rel=\"stylesheet\" type=\"text/css\" href=\"/dist/bundle.css\">\n        <meta charset=\"utf-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0\" />\n        <title>Social-react</title>\n      </head>\n      <body>\n        <container id=\"react\">" + html + "</container>\n        <script>\n\n        </script>\n        <script src=\"/dist/bundle.js\"></script>\n      </body>\n    </html>\n  ";
}
