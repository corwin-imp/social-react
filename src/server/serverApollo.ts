import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import schema from "./schema";

export const apollo = new ApolloServer({ schema })


