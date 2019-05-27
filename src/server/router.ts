import {apollo} from "./serverApollo";
import * as express from 'express';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import * as health from './controllers/health';
import * as renderer from './controllers/renderer';
import { resolvers, schema } from '../graphql/schema';
import { endpoint } from '../graphql/constants';
import { compiler } from './index';


export function router(app: express.Application) {
    apollo.applyMiddleware({ app, path: endpoint });
    app.use('/favicon.ico', (req, res) => res.status(200).send());
    //app.use('/public', express.static('dist/client'));
    app.get('/api/health', health.get);
    //app.get('*', renderer.get);
    //app.get('/*', webpackHotServerMiddleware(compiler));
}
