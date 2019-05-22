"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const path_1 = tslib_1.__importDefault(require("path"));
const fs = require("fs");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const webpack_1 = tslib_1.__importDefault(require("webpack"));
const webpack_config_dev_1 = tslib_1.__importDefault(require("../../webpack.config.dev"));
const compiler = webpack_1.default(webpack_config_dev_1.default);
const passport_1 = tslib_1.__importDefault(require("passport"));
require("../../config/passport")(passport_1.default);
const config_1 = tslib_1.__importDefault(require("../../config/config"));
const app = express_1.default();
const fileUpload = require("express-fileupload");
const { nameBase, portBase, hostUser } = config_1.default.db;
console.log("dbb", hostUser);
var corsAnywhere = require("cors-anywhere");
process.env.MONGOLAB_URI =
    process.env.MONGOLAB_URI || `mongodb://${hostUser}:${portBase}/${nameBase}`;
process.env.PORT = process.env.PORT || 3000;
const port = process.env.PORT || process.env.PORT || 3000;
// connect our DB
mongoose_1.default.connect(process.env.MONGOLAB_URI, {
    useMongoClient: true
    /* other options */
}, function (err) {
    if (err) {
        console.log("err", err);
    }
});
let proxy = corsAnywhere.createServer({
    originWhitelist: [],
    requireHeaders: [],
    removeHeaders: [] // Do not remove any headers.
});
/* Attach our cors proxy to the existing API on the /proxy endpoint. */
app.get("/proxy/:proxyUrl*", (req, res) => {
    req.url = req.url.replace("/proxy/", "/"); // Strip '/proxy' from the front of the URL, else the proxy won't work.
    proxy.emit("request", req, res);
});
process.on("uncaughtException", function (err) {
    //what is непойманный исключение
    console.log(err);
});
//app.use(cors());
app.use(passport_1.default.initialize());
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: webpack_config_dev_1.default.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));
app.use(fileUpload());
//load routers
const messageRouter = express_1.default.Router();
const usersRouter = express_1.default.Router();
const channelRouter = express_1.default.Router();
const profilesRouter = express_1.default.Router();
const ftpRouter = express_1.default.Router();
require("./routes/message_routes")(messageRouter);
require("./routes/channel_routes")(channelRouter);
require("./routes/profiles_routes")(profilesRouter);
require("./routes/ftp_routes")(ftpRouter);
require("./routes/user_routes")(usersRouter, passport_1.default);
app.use("/api", messageRouter);
app.use("/api", usersRouter);
app.use("/api", channelRouter);
app.use("/api", profilesRouter);
app.use("/ftp", ftpRouter);
app.use("/", express_1.default.static(path_1.default.join(__dirname, "..", "static")));
