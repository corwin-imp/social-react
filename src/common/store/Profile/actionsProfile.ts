import * as Types from '../../constants/ActionTypes-items'
import Api from '../../api'
import { ROUTING } from '../../constants/Routing'
import load_files from '../../modules/files'
//import remote from '../modules/remote'

import {Dispatch} from 'redux'
import { push } from 'react-router-redux'
import { browserHistory } from '../../services/history'

import io from 'socket.io-client'
const types:any = Types
const socket = io('', { path: '/api/chat' })
let request = require('superagent')

import { createAction } from 'redux-actions';
//import { createSignalAction } from "../typeSettings";
import Profile from "./Profile";
import Cookies from "react-cookie";

const api: any = Api
const _Cookies: any = Cookies;

const cookie: any = new _Cookies();

export const addItem = createAction(types.ADD,(data:any) => {
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

export const setSongAction = createAction(types.CHOOSE,(song:any) =>{
  return {
    song,
  }
})
export const removeFileAction = createAction(types.REMOVE_FILE,({file, typeFile}:any) =>{
  return {
    file,
    typeFile
  }
})


/*export const addItem = data => {
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
}*/
export const setSong = (song: any) => (dispatch:any) => {
  dispatch(setSongAction(song))

}
export const removeFile = (type:any,file:any,index:any) => (dispatch:any) => {

 api.removeFile({type: type,'file': file}).then(
     () => {
        dispatch(removeFileAction({file: index,
          typeFile: type}))

      },
     (error:any) => {
        console.log('err')
        console.log(error)
      }
  );
}
export const addFile = (file:any,type:any) => (dispatch:any) => {
  api.add({type: type,'file': file}).then(
      () => {
        console.log('done');
        //browserHistory.push(`/profiles/${index}`);
      },
      (error:any) => {
        console.log('err')
        console.log(error)
      }
  );
}
export const getFiles = (some:any) => (dispatch:any) => {

  load_files(some, (err: any, files:any) => {

    if (files.length) {
      var someVar:any = some.toUpperCase().replace('-', '_')

      dispatch({
        type: types[someVar],
        files: files,
      })
    }
  })
}
export const getItems = (dispatch:any)  => {
  const userId = cookie.load('userId')

    api.getItems([])
        .then(
            (result:any) => {
              let itemsBase = result['data']
              let newItems:any = new Map()
              let ids:any = []

              itemsBase.forEach(function(item:any) {
                let user = item['local']
                if (item._id == userId) {
                  return
                }
                let newItem:any = {
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
            (error:any) => {
              console.log('err')
              console.log(error)
            }
        )
        .then((dataTHen:any) => {
          let ids = dataTHen.ids

          socket.emit('get users', ids)
          socket.on('server users', function(message:any) {
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

          socket.on('delete socket', function(id:any) {
            dispatch({ type: types.LEAVE_ITEM, id: id })
          })
        })


}

export const offItem = (id:any) => {
  socket.emit('leave user', id)
  return {
    type: types.LEAVE_ITEM,
    id: id,
  }
}
export const onItem = (id:any) => (dispatch:Dispatch) => {
  //  return {'type': types.IN_ITEM, id: id};
}
export const getItem = (index:any) => (dispatch: Dispatch) => {
  let userId = { userId: index }
  api.getItem(userId).then(
      (result:any) => {
      let itemB = result['data']
      dispatch({
        type: types.GET_ITEM,
        item: itemB,
        id: index,
      })
      //browserHistory.push(`/profiles/${index}`);
    },
      (error:any) => {
      console.log('err')
      console.log(error)
    }
  )
}

export const getVideo = () => (dispatch:any) => {
  api.getVideo([]).then(
      (result:any) => {
      let videoBase = result['data']
      dispatch({
        type: types.GET_VIDEO,
        video: videoBase,
      })
    },
      (error:any) => {
      console.log('err')
      console.log(error)
    }
  )
}
export const addVideo = (data:any, dispatch:any) => {
  let bdata = [data.name, data.src]

  api.addVideo(bdata).then((result:any) => {
    let id = result.data['_id']
    dispatch({
      type: types.ADD_VIDEO,
      name: data.name,
      id: id,
      src: data.src,
    })
  })
}
export const delVideo = (idBase:any) => {
  let bdata = { id: idBase }

  return (dispatch:any) => {
    return api
      .delVideo(bdata)
      .then((response:any) => {
        console.log('res', response)
        dispatch({
          type: types.DEL_VIDEO,
          id: idBase,
        })
      })
      .catch((error:any) => {
        throw error
      })
  }
}
export const delItem = (idBase:any) => {
  let bdata = { id: idBase }

  api.delItem(bdata).then(
      () => {
      browserHistory.push('/profiles')
    },
      (error:any) => {
      console.log('err')
      console.log(error)
    }
  )
  return {
    type: types.DEL_ITEM,
    id: idBase,
  }
}
export const list = (id:any, list:any) => {
  let bdata = [id, list]
  api.list(bdata)
  return {
    type: types.LIST,
    list,
    id,
  }
}

export const choose = (id:any, choose:any) => {
  return {
    type: types.CHOOSE,
    id,
    choose,
  }
}
export const on = (id:any) => {
  return {
    type: types.ON,
    id,
  }
}
export const quickSearch = (name: any) => {
  return  api.getItems(name)
}
export const clearSearch = (name: any) => {

  return  {
    type:types.FULL_SEARCH,
    name: false
  }
}
export const fullSearch = (name: any) => {
  browserHistory.push('/profiles')
  return  {
    type:types.FULL_SEARCH,
    name: name
  }
}
export const off = (id: any) => {
  return {
    type: types.OFF,
    id,
  }
}
export const updateItem = (data: any, id: any) => {
  return {
    type: types.UPDATE_ITEM,
    data: data,
    idBase: id,
  }
}
