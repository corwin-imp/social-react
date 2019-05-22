'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const path_1 = tslib_1.__importDefault(require("path"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const server_1 = require("react-dom/server");
const react_redux_1 = require("react-redux");
const react_1 = tslib_1.__importDefault(require("react"));
const configureStore_1 = tslib_1.__importDefault(require("../common/store/configureStore/configureStore"));
const react_router_1 = require("react-router");
const routes_1 = tslib_1.__importDefault(require("../common/routes"));
const createMemoryHistory_1 = tslib_1.__importDefault(require("history/createMemoryHistory"));
const passport_1 = tslib_1.__importDefault(require("passport"));
require('../../config/passport')(passport_1.default);
const socket_io_1 = tslib_1.__importDefault(require("socket.io"));
const config_1 = tslib_1.__importDefault(require("../../config/config"));
const app = express_1.default();
const { nameBase, portBase, hostUser } = config_1.default.db;
var corsAnywhere = require('cors-anywhere');
const fileUpload = require('express-fileupload');
process.env.MONGOLAB_URI =
    process.env.MONGOLAB_URI || `mongodb://${hostUser}:${portBase}/${nameBase}`;
process.env.PORT = process.env.PORT || 3000;
// connect our DB
mongoose_1.default.connect(process.env.MONGOLAB_URI);
process.on('uncaughtException', function (err) {
    console.log(err);
});
app.use(passport_1.default.initialize());
let proxy = corsAnywhere.createServer({
    originWhitelist: [],
    requireHeaders: [],
    removeHeaders: [],
});
/* Attach our cors proxy to the existing API on the /proxy endpoint. */
app.get('/proxy/:proxyUrl*', (req, res) => {
    req.url = req.url.replace('/proxy/', '/'); // Strip '/proxy' from the front of the URL, else the proxy won't work.
    proxy.emit('request', req, res);
});
app.use(fileUpload());
//load routers
const messageRouter = express_1.default.Router();
const usersRouter = express_1.default.Router();
const channelRouter = express_1.default.Router();
const profilesRouter = express_1.default.Router();
const ftpRouter = express_1.default.Router();
require('./routes/message_routes')(messageRouter);
require('./routes/channel_routes')(channelRouter);
require('./routes/profiles_routes')(profilesRouter);
require('./routes/ftp_routes')(ftpRouter);
require('./routes/user_routes')(usersRouter, passport_1.default);
app.use('/api', messageRouter);
app.use('/api', usersRouter);
app.use('/api', profilesRouter);
app.use('/api', channelRouter);
app.use('/ftp', ftpRouter);
app.use('/', express_1.default.static(path_1.default.join(__dirname, '../..', 'static')));
app.get('/*', function (req, res) {
    const history = createMemoryHistory_1.default();
    const location = history.location;
    match({ routes: routes_1.default, location }, (err, redirectLocation, renderProps) => {
        if (err) {
            console.error(err);
            return res.status(500).end('Internal server error');
        }
        if (!renderProps) {
            return res.status(404).end('Not found');
        }
        const InitialView = (react_1.default.createElement(react_redux_1.Provider, { className: "root", store: configureStore_1.default },
            react_1.default.createElement("div", { style: { height: '100%' } },
                react_1.default.createElement(react_router_1.RouterContext, Object.assign({}, renderProps)))));
        const initialState = configureStore_1.default.getState();
        const html = server_1.renderToString(InitialView);
        res.status(200).end(renderFullPage(html, initialState));
    });
});
const server = app.listen(process.env.PORT, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('server listening on port: %s', process.env.PORT);
});
const io = new socket_io_1.default(server, { path: '/api/chat' });
const socketEvents = require('./socketEvents')(io);
function renderFullPage(html, initialState) {
    return `
    <!doctype html>
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/dist/bootstrap.min.css" />
        <link href="/dist/fontawesome-all.min.css" type="text/css" rel="stylesheet">
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" type="text/css" href="/dist/bundle.css">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <title>Social-react</title>
      </head>
      <body>
        <container id="react">${html}</container>
        <script>

        </script>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `;
}
