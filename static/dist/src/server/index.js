"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_1 = tslib_1.__importDefault(require("http"));
const app_1 = require("./app");
const env_1 = require("./env");
const serverApollo_1 = require("./serverApollo");
serverApollo_1.server.applyMiddleware({
    app: app_1.app,
    path: '/graphql',
    cors: { credentials: true, origin: env_1.origin },
});
const httpServer = http_1.default.createServer(app_1.app);
serverApollo_1.server.installSubscriptionHandlers(httpServer);
httpServer.listen(env_1.port, () => {
    console.log(`Server is listening on port ${env_1.port}`);
});
