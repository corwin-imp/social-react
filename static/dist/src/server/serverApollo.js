"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = tslib_1.__importDefault(require("./schema"));
exports.server = new apollo_server_express_1.ApolloServer({ schema: schema_1.default });
