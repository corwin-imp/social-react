import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
export var server = new ApolloServer({ schema: schema });
