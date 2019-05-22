"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_iso_date_1 = require("graphql-iso-date");
const db_1 = require("../db");
const resolvers = {
    Date: graphql_iso_date_1.GraphQLDateTime,
    Chat: {
        messages(chat) {
            return db_1.messages.filter(m => chat.messages.includes(m.id));
        },
        lastMessage(chat) {
            const lastMessage = chat.messages[chat.messages.length - 1];
            return db_1.messages.find(m => m.id === lastMessage);
        },
    },
    Query: {
        chats() {
            return db_1.chats;
        },
        chat(root, { chatId }) {
            return db_1.chats.find(c => c.id === chatId);
        },
    },
};
exports.default = resolvers;
