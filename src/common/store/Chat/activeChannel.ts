import { CHANGE_CHANNEL } from './TypesChat'

const initialState = {
  name: 'Lobby',
  id: 0,
}

export default function activeChannel(state = initialState, action:any) {
  switch (action.type) {
    case CHANGE_CHANNEL:
      return {
        name: action.channel.name,
        id: action.channel.id,
      }

    default:
      return state
  }
}
