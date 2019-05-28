"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const env = process.env;
const isProd = env.NODE_ENV === "production";
const isDev = env.NODE_ENV === "development";
// do not use isProd, isDev ..etc in render.tsx
// tslint:disable:object-literal-sort-keys
exports.config = {
    env: env.NODE_ENV,
    serverHost: env.SERVER_HOST || "localhost",
    serverPort: env.SERVER_PORT || 4000,
    isDev,
    isProd,
    staticPath: isProd && path_1.default.resolve(__dirname, "../client")
        || path_1.default.resolve(__dirname, "../src/public"),
};
