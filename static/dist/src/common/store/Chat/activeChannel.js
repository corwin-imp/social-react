import { CHANGE_CHANNEL } from './TypesChat';
var initialState = {
    name: 'Lobby',
    id: 0,
};
export default function activeChannel(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case CHANGE_CHANNEL:
            return {
                name: action.channel.name,
                id: action.channel.id,
            };
        default:
            return state;
    }
}
