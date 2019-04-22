import * as types from '../../constants/ActionTypes-items'
import api from '../../api'
import { connect } from 'react-redux'
import * as actions from '../Profile/actionsProfile'

const initialState = {
  video: [],
  deleted: false,
}

const reducerVideo = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_VIDEO:
      let newVideo = { name: action.name, href: action.src }
      var videoIn = Object.assign({}, state.video)

      videoIn[action.id] = newVideo

      return {
        ...state,
        video: videoIn,
      }
      break
    case types.DEL_VIDEO:
      let videos = []
      Object.keys(state.video).map(function(key, index) {
        console.log('i', key)
        if (key == action.id) {
        } else {
          videos[key] = state.video[key]
        }
      })

      return {
        ...state,
        video: videos,
      }
      break
    case types.GET_VIDEO: // another reducerApp
      var newState = {
        ...state,
        video: state.video,
      }
      var dev = action.video

      if (typeof dev != 'string') {
        var baseS = []

        action.video.forEach(function(item, i, arr) {
          var newv = { name: item.name, href: item.src }

          //  newItems.set(item._id, newItem);
          baseS[item['_id']] = newv
        })
        console.info('devVideo', baseS)
        newState = {
          video: baseS,
        }
      }

      return newState
      break
    default:
      if (state.video == []) {
        reducerVideo({ type: types.GET_VIDEO })
      }
      return state
  }
}

export default reducerVideo
