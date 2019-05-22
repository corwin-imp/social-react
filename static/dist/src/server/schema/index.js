import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
var typeDefs = importSchema('src/server/schema/typeDefs.graphql');
export default makeExecutableSchema({ resolvers: resolvers, typeDefs: typeDefs });
