"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_import_1 = require("graphql-import");
const graphql_tools_1 = require("graphql-tools");
const resolvers_1 = tslib_1.__importDefault(require("./resolvers"));
const typeDefs = graphql_import_1.importSchema('src/server/schema/typeDefs.graphql');
exports.default = graphql_tools_1.makeExecutableSchema({ resolvers: resolvers_1.default, typeDefs });
