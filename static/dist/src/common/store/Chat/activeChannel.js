"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypesChat_1 = require("./TypesChat");
const initialState = {
    name: 'Lobby',
    id: 0,
};
function activeChannel(state = initialState, action) {
    switch (action.type) {
        case TypesChat_1.CHANGE_CHANNEL:
            return {
                name: action.channel.name,
                id: action.channel.id,
            };
        default:
            return state;
    }
}
exports.default = activeChannel;
