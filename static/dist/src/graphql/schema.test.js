"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const nock_1 = tslib_1.__importDefault(require("nock"));
const schema_1 = require("./schema");
test('should return organizations resolver', async () => {
    const GET_ORGS = `
    query {
      organizations {
        name
        uid
      }
    }
  `;
    const res = await graphql_1.graphql(schema_1.schema, GET_ORGS, null, {
        organizations: schema_1.organizations
    });
    expect(res).toMatchSnapshot();
});
test('should return organization resolver', async () => {
    const GET_ORG = `
    query {
      organization(name: "nodejs") {
        name
        uid
        uri
      }
    }
  `;
    const res = await graphql_1.graphql(schema_1.schema, GET_ORG, null, {
        organizations: schema_1.organizations
    });
    expect(res).toMatchSnapshot();
});
test('should return author resolver', async () => {
    nock_1.default('https://api.github.com')
        .get('/users/hiroppy')
        .reply(200, {
        id: 1,
        name: 'hiroppy',
        blog: 'blog',
        avatar_url: 'avatar',
        html_url: 'html',
        dummy: 'dummy'
    });
    const GET_AUTHOR = `
    query {
      author {
        id
        name
        blog
        avatar_url
        html_url
      }
    }
  `;
    const res = await graphql_1.graphql(schema_1.schema, GET_AUTHOR, null);
    expect(res).toMatchSnapshot();
});
test('should return addOrganization resolver', async () => {
    const ADD_ORGANIZATION = `
    mutation addOrganization($name: String!) {
      addOrganization(name: $name) {
        name
        uri
        uid
      }
    }
  `;
    const res = await graphql_1.graphql(schema_1.schema, ADD_ORGANIZATION, null, {
        organizations: schema_1.organizations
    }, {
        name: 'test'
    });
    expect(res).toMatchSnapshot();
});
