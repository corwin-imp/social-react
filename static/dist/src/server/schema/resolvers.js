import { GraphQLDateTime } from 'graphql-iso-date';
import { chats, messages } from '../db';
var resolvers = {
    Date: GraphQLDateTime,
    Chat: {
        messages: function (chat) {
            return messages.filter(function (m) { return chat.messages.includes(m.id); });
        },
        lastMessage: function (chat) {
            var lastMessage = chat.messages[chat.messages.length - 1];
            return messages.find(function (m) { return m.id === lastMessage; });
        },
    },
    Query: {
        chats: function () {
            return chats;
        },
        chat: function (root, _a) {
            var chatId = _a.chatId;
            return chats.find(function (c) { return c.id === chatId; });
        },
    },
    Mutation: {
        addMessage: function (root, _a) {
            var chatId = _a.chatId, content = _a.content;
            var chatIndex = chats.findIndex(function (c) { return c.id === chatId; });
            if (chatIndex === -1)
                return null;
            var chat = chats[chatIndex];
            var recentMessage = messages[messages.length - 1];
            var messageId = String(Number(recentMessage.id) + 1);
            var message = {
                id: messageId,
                createdAt: new Date(),
                content: content,
            };
            messages.push(message);
            chat.messages.push(messageId);
            // The chat will appear at the top of the ChatsList component
            chats.splice(chatIndex, 1);
            chats.unshift(chat);
            return message;
        }
    }
};
export default resolvers;
