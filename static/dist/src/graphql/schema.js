"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tools_1 = require("graphql-tools");
const rest_1 = tslib_1.__importDefault(require("@octokit/rest"));
const octokit = new rest_1.default();
exports.organizations = [
    {
        name: 'nodejs',
        uri: 'https://github.com/nodejs',
        uid: 1
    },
    {
        name: 'facebook',
        uri: 'https://github.com/facebook',
        uid: 2
    },
    {
        name: 'google',
        uri: 'https://github.com/google',
        uid: 3
    },
    {
        name: 'microsoft',
        uri: 'https://github.com/microsoft',
        uid: 4
    }
];
exports.typeDefs = `
  type Organization {
    name: String!
    uri: String!
    uid: Int!
  }

  type Author {
    id: Int!
    name: String!
    avatar_url: String!
    html_url: String
    blog: String!
  }

  type Query {
    organizations: [Organization]
    organization(name: String!): Organization
    author: Author
  }

  type Mutation {
    addOrganization(name: String!): Organization
  }
`;
exports.resolvers = {
    Query: {
        organizations: () => exports.organizations,
        organization: (obj, { name }) => exports.organizations.find((o) => o.name === name),
        author: () => octokit.users.getByUsername({ username: 'hiroppy' }).then(({ data }) => data)
    },
    Mutation: {
        addOrganization: (obj, { name }) => {
            if (exports.organizations.some((o) => o.name === name))
                throw new Error('already exist');
            const org = {
                name,
                uid: exports.organizations.length + 1,
                uri: `https://github.com/${name}`
            };
            exports.organizations.push(org);
            return org;
        }
    }
};
exports.schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: exports.typeDefs,
    resolvers: exports.resolvers
});
