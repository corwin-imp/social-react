import http from 'http';
import { app } from './app';
import { origin, port } from './env';
import { server } from './serverApollo';
server.applyMiddleware({
    app: app,
    path: '/graphql',
    cors: { credentials: true, origin: origin },
});
var httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);
httpServer.listen(port, function () {
    console.log("Server is listening on port " + port);
});
