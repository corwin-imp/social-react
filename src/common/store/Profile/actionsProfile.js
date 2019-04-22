import * as types from '../../constants/ActionTypes-items'
import api from '../../api'
import { ROUTING } from '../../constants/Routing'
import load_files from '../../modules/files'
//import remote from '../modules/remote'
import cookie from 'react-cookie'
import { push } from 'react-router-redux'
import { browserHistory } from 'react-router'

import io from 'socket.io-client'

const socket = io('', { path: '/api/chat' })
let request = require('superagent')

import { createAction } from 'redux-actions';
import { createSignalAction } from "../typeSettings";
import Profile from "./Profile";



export const addItem = createAction(types.ADD,data => {
  let profile = {
    local: {
      username: data.name,
    },
  }
  return {

    item: profile,
    name: data.name,
  }
});

export const setSongAction = createAction(types.CHOOSE,(song) =>{
  return {
    song,
  }
})
export const removeFileAction = createAction(types.REMOVE_FILE,({file, typeFile}) =>{
  return {
    file,
    typeFile
  }
})


export const addItem = data => {
  let profile = {
    local: {
      username: data.name,
    },
  }
  return {
    type: types.ADD,
    item: profile,
    name: data.name,
  }
}
export const setSong = song => dispatch => {
  dispatch(setSongAction(song))

}
export const removeFile = (type,file,index) => dispatch => {

 api.removeFile({type: type,'file': file}).then(
      result => {
        dispatch(removeFileAction({file: index,
          typeFile: type}))

      },
      error => {
        console.log('err')
        console.log(error)
      }
  );
}
export const addFile = (file,type) => dispatch => {
  api.add({type: type,'file': file}).then(
      result => {
        console.log('done');
        //browserHistory.push(`/profiles/${index}`);
      },
      error => {
        console.log('err')
        console.log(error)
      }
  );
}
export const getFiles = some => dispatch => {

  load_files(some, (err, files) => {

    if (files.length) {
      var someVar = some.toUpperCase().replace('-', '_')

      dispatch({
        type: types[someVar],
        files: files,
      })
    }
  })
}
export const getItems = (dispatch)  => {
  const userId = cookie.load('userId')

    api.getItems([])
        .then(
            result => {
              let itemsBase = result['data']
              let newItems = new Map()
              let ids = []

              itemsBase.forEach(function(item, i, arr) {
                let user = item['local']
                if (item._id == userId) {
                  return
                }
                let newItem = {
                  name: user.username,
                  age: user.age,
                  gender: user.gender,
                  email: user.email,
                  picture: user.picture,
                  city: user.city,
                  status: 0,
                  country: user.country,
                }

                newItem['dataId'] = item._id
                ids.push(item._id)
                newItems.set(item._id, newItem)
              })
              let dataTHen = { ids, newItems }
              return dataTHen
            },
            error => {
              console.log('err')
              console.log(error)
            }
        )
        .then(dataTHen => {
          let ids = dataTHen.ids

          socket.emit('get users', ids)
          socket.on('server users', function(message) {
            var people = JSON.parse(message)

            let NewMap = new Map()
            for (let value of dataTHen.newItems) {
              if (people.indexOf(value[0]) != -1) {
                var status = 1
              } else {
                var status = 0
              }

              value[1].status = status
              NewMap.set(value['0'], value[1])
            }
            dispatch({
              type: types.GET_ITEMS,
              items: NewMap,
            })
          })

          socket.on('delete socket', function(id) {
            dispatch({ type: types.LEAVE_ITEM, id: id })
          })
        })


}

export const offItem = id => dispatch => {
  socket.emit('leave user', id)
  return {
    type: types.LEAVE_ITEM,
    id: id,
  }
}
export const onItem = id => dispatch => {
  //  return {'type': types.IN_ITEM, id: id};
}
export const getItem = index => dispatch => {
  let userId = { userId: index }
  api.getItem(userId).then(
    result => {
      let itemB = result['data']
      dispatch({
        type: types.GET_ITEM,
        item: itemB,
        id: index,
      })
      //browserHistory.push(`/profiles/${index}`);
    },
    error => {
      console.log('err')
      console.log(error)
    }
  )
}

export const getVideo = () => dispatch => {
  api.getVideo([]).then(
    result => {
      let videoBase = result['data']
      dispatch({
        type: types.GET_VIDEO,
        video: videoBase,
      })
    },
    error => {
      console.log('err')
      console.log(error)
    }
  )
}
export const addVideo = (data, dispatch) => {
  let bdata = [data.name, data.src]

  api.addVideo(bdata).then(result => {
    let id = result.data['_id']
    dispatch({
      type: types.ADD_VIDEO,
      name: data.name,
      id: id,
      src: data.src,
    })
  })
}
export const delVideo = idBase => {
  let bdata = { id: idBase }

  return dispatch => {
    return api
      .delVideo(bdata)
      .then(response => {
        console.log('res', response)
        dispatch({
          type: types.DEL_VIDEO,
          id: idBase,
        })
      })
      .catch(error => {
        throw error
      })
  }
}
export const delItem = idBase => {
  let bdata = { id: idBase }

  api.delItem(bdata).then(
    result => {
      browserHistory.push('/profiles')
    },
    error => {
      console.log('err')
      console.log(error)
    }
  )
  return {
    type: types.DEL_ITEM,
    id: idBase,
  }
}
export const list = (id, list) => {
  let bdata = [id, list]
  api.list(bdata)
  return {
    type: types.LIST,
    list,
    id,
  }
}

export const choose = (id, choose) => {
  return {
    type: types.CHOOSE,
    id,
    choose,
  }
}
export const on = id => {
  return {
    type: types.ON,
    id,
  }
}
export const quickSearch = name => {
  return  api.getItems(name)
}
export const clearSearch = name => {

  return  {
    type:types.FULL_SEARCH,
    name: false
  }
}
export const fullSearch = name => {
  browserHistory.push('/profiles')
  return  {
    type:types.FULL_SEARCH,
    name: name
  }
}
export const off = id => {
  return {
    type: types.OFF,
    id,
  }
}
export const updateItem = (data, id) => {
  return {
    type: types.UPDATE_ITEM,
    data: data,
    idBase: id,
  }
}
