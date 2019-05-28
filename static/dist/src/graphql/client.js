"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_boost_1 = require("apollo-boost");
const apollo_link_schema_1 = require("apollo-link-schema");
const schema_1 = require("./schema");
const constants_1 = require("./constants");
function createClient() {
    const wind = window;
    return new apollo_boost_1.ApolloClient({
        ssrMode: !process.env.IS_BROWSER,
        link: process.env.IS_BROWSER ? new apollo_boost_1.HttpLink({ uri: constants_1.endpoint }) : new apollo_link_schema_1.SchemaLink({ schema: schema_1.schema }),
        cache: process.env.IS_BROWSER
            ? new apollo_boost_1.InMemoryCache().restore(wind.__APOLLO_STATE__)
            : new apollo_boost_1.InMemoryCache()
    });
}
exports.createClient = createClient;
