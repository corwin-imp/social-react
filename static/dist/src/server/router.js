"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const serverApollo_1 = require("./serverApollo");
const webpack_hot_server_middleware_1 = tslib_1.__importDefault(require("webpack-hot-server-middleware"));
const health = tslib_1.__importStar(require("./controllers/health"));
const constants_1 = require("../graphql/constants");
const index_1 = require("./index");
function router(app) {
    serverApollo_1.apollo.applyMiddleware({ app, path: constants_1.endpoint });
    app.use('/favicon.ico', (req, res) => res.status(200).send());
    //app.use('/public', express.static('dist/client'));
    app.get('/api/health', health.get);
    //app.get('*', renderer.get);
    app.get('/*', webpack_hot_server_middleware_1.default(index_1.compiler));
}
exports.router = router;
