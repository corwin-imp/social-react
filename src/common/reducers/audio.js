import * as types from '../constants/ActionAudio'
import url from 'url'
const initialState = {
  playing: false,
  src: false,
  loaded: false,
  music: [],
  loop: false,
  progress: 0,
  mount: true,
  seek: false,
  in_set_progress_mode: false,
  mute: false,
  volume: 1.0,
  keyWord: false,
  history: [],
}

export default function audio(state = initialState, action) {
  switch (action.type) {
    case types.handleToggle:
      return {
        ...state,
        playing: !state.playing,
        keyWord: 'playing',
      }
      break
    case types.onPlayerNext:
      state.history.push(state.src)
      return {
        ...state,
        src: ++state.src,
        seek: false,
        history: state.history,
      }
      break
    case types.onPlayerPrev:
      let src = state.history.pop()
      return {
        ...state,
        seek: false,
        src: src,
      }
      break

    case types.load:
      if (state.src !== action.src) {
        var pl = true
      } else if (state.src == action.src && state.playing) {
        var pl = false
      } else if (state.src == action.src && !state.playing) {
        var pl = true
      }
      return {
        ...state,
        src: action.src,
        seek: false,
        playing: pl,
        keyWord: 'playing',
      }
      break
    case types.renderSeekPos:
      return {
        ...state,
        seek: action.seek,
      }
      break
    case types.SET_Progress:
      return {
        ...state,
        progress: action.progress,
        seek: action.seek,
        keyWord: 'progress',
      }
      break
    case types.volume:
      return {
        ...state,
        volume: action.volume,
      }
      break
    case types.trigMount:
      return {
        ...state,
        mount: !state.mount,
      }
      break
    case types.handleOnLoad:
      return {
        ...state,
        duration: action.duration,
      }
      break
    default:
      return state
      break
  }
}

/*
 case types.onUpdate:
 return {
 progress: state.seek / state.duration
 };
 break;

 case types.handleOnPlay:
 return {
 playing: true
 };
 break;
 case types.handleOnEnd:
 return {
 playing: false
 };
 break;
 case types.handleStop:
 return {
 playing: false
 };
 break;
 case types.handleLoopToggle:
 return {
 loop: !state.loop
 };
 break;
 case types.handleMuteToggle:
 return {
 mute: !state.mute
 };
 break;*/
