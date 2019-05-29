import * as types from '../../constants/ActionTypes-items'
import { AnyAction } from 'redux'
import url from 'url'
const initialState: any = {
    music: [],
    pictures: []

}

export default function audio(state = initialState, action: AnyAction) {
    function getMusicName(value: any) {
        var path_parts = url.parse(value).path.split('/')

        let songName = decodeURIComponent(path_parts[path_parts.length - 1])
        songName = songName.replace(/.mp3/g, '')
        return songName
    }
    function getName(value: any) {
        var path_parts = url.parse(value).path.split('/')
        return decodeURIComponent(path_parts[path_parts.length - 1])
    }
    switch (action.type) {

        case types.GET_MUSIC:


            let files: any = []
            action.files.map((value: any, index: any) => {
                files[index] = {
                    href: value,
                    name: getMusicName(value),
                }
            })
            return {
                ...state,
                music: files
            }
            break
        case types.GET_PICTURES:


            let pictures: any = []

            action.files.map((value: string, index: number) => {
                pictures[index] = {
                    src: value,
                    name: getName(value),
                }
            })

            return {
                ...state,
                pictures: pictures,
            }
        break
        case types.REMOVE_FILE:
            console.log('files',state[action.typeFile]);
            var Upfiles = Object.assign([], state[action.typeFile])
console.log('up',action.file);
            Upfiles.splice(action.file, 1);
            let newState = {
                ...state,
            }
            newState[action.typeFile] = Upfiles;
            console.log('state',newState);
            return newState
            break
        default:
            return state
            break
    }
}
