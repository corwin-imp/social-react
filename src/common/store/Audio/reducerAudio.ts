import { handleActions } from 'redux-actions'
import * as actions from "./actionsAudio";


const initialState:any = {
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
const reducerAudio = handleActions(
    {
        [`${actions.onPlayerNext}`]: (state) => {
            state.history.push(state.src)
            return {
                ...state,
                src: ++state.src,
                seek: false,
                history: state.history,
            }
        },
        [`${actions.onPlayerPrev}`]: (state, action: any) => {
            let src = state.history.pop()
            return {
                ...state,
                seek: false,
                src: src,
            }
        },
        [`${actions.handleToggle}`]: (state, action: any) =>  {

            return {
                ...state,
                playing: !state.playing,
                keyWord: 'playing',
            }
        },
        [`${actions.load}`]: (state, action: any) => {

            if (state.src !== action.data) {
                var pl = true
            } else if (state.src == action.data && state.playing) {
                var pl = false
            } else if (state.src == action.data && !state.playing) {
                var pl = true
            }
            return {
                ...state,
                src: action.data,
                seek: false,
                playing: pl,
                keyWord: 'playing',
            }
        },
        [`${actions.setProgress}`]: (state, action: any) => {

            return {
                ...state,
                progress: action.progress,
                seek: action.seek,
                keyWord: 'progress',
            }
        },
        [`${actions.handleOnLoad}`]: (state, action: any) => {

            return {
                ...state,
                duration: action.data,
            }
        },
        [`${actions.volume}`]: (state, action: any) => {

            return {
                ...state,
                volume: action.data,
            }
        },
        [`${actions.renderSeekPos}`]: (state, action: any) => {

            return {
                ...state,
                seek: action.data,
            }
        },
        [`${actions.trigMount}`]: (state, action: any) => {

            return {
                ...state,
                mount: !state.mount,
            }
        },
    },
    initialState
);
export default reducerAudio;
