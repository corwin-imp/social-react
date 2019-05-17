import * as types from '../../constants/ActionTypes-items';
import api from '../../api';
import load_files from '../../modules/files';
//import remote from '../modules/remote'
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import io from 'socket.io-client';
var socket = io('', { path: '/api/chat' });
var request = require('superagent');
import { createAction } from 'redux-actions';
export var addItem = createAction(types.ADD, function (data) {
    var profile = {
        local: {
            username: data.name,
        },
    };
    return {
        item: profile,
        name: data.name,
    };
});
export var setSongAction = createAction(types.CHOOSE, function (song) {
    return {
        song: song,
    };
});
export var removeFileAction = createAction(types.REMOVE_FILE, function (_a) {
    var file = _a.file, typeFile = _a.typeFile;
    return {
        file: file,
        typeFile: typeFile
    };
});
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
export var setSong = function (song) { return function (dispatch) {
    dispatch(setSongAction(song));
}; };
export var removeFile = function (type, file, index) { return function (dispatch) {
    api.removeFile({ type: type, 'file': file }).then(function (result) {
        dispatch(removeFileAction({ file: index,
            typeFile: type }));
    }, function (error) {
        console.log('err');
        console.log(error);
    });
}; };
export var addFile = function (file, type) { return function (dispatch) {
    api.add({ type: type, 'file': file }).then(function (result) {
        console.log('done');
        //browserHistory.push(`/profiles/${index}`);
    }, function (error) {
        console.log('err');
        console.log(error);
    });
}; };
export var getFiles = function (some) { return function (dispatch) {
    load_files(some, function (err, files) {
        if (files.length) {
            var someVar = some.toUpperCase().replace('-', '_');
            dispatch({
                type: types[someVar],
                files: files,
            });
        }
    });
}; };
export var getItems = function (dispatch) {
    var userId = cookie.load('userId');
    api.getItems([])
        .then(function (result) {
        var itemsBase = result['data'];
        var newItems = new Map();
        var ids = [];
        itemsBase.forEach(function (item, i, arr) {
            var user = item['local'];
            if (item._id == userId) {
                return;
            }
            var newItem = {
                name: user.username,
                age: user.age,
                gender: user.gender,
                email: user.email,
                picture: user.picture,
                city: user.city,
                status: 0,
                country: user.country,
            };
            newItem['dataId'] = item._id;
            ids.push(item._id);
            newItems.set(item._id, newItem);
        });
        var dataTHen = { ids: ids, newItems: newItems };
        return dataTHen;
    }, function (error) {
        console.log('err');
        console.log(error);
    })
        .then(function (dataTHen) {
        var ids = dataTHen.ids;
        socket.emit('get users', ids);
        socket.on('server users', function (message) {
            var people = JSON.parse(message);
            var NewMap = new Map();
            for (var _i = 0, _a = dataTHen.newItems; _i < _a.length; _i++) {
                var value = _a[_i];
                if (people.indexOf(value[0]) != -1) {
                    var status = 1;
                }
                else {
                    var status = 0;
                }
                value[1].status = status;
                NewMap.set(value['0'], value[1]);
            }
            dispatch({
                type: types.GET_ITEMS,
                items: NewMap,
            });
        });
        socket.on('delete socket', function (id) {
            dispatch({ type: types.LEAVE_ITEM, id: id });
        });
    });
};
export var offItem = function (id) { return function (dispatch) {
    socket.emit('leave user', id);
    return {
        type: types.LEAVE_ITEM,
        id: id,
    };
}; };
export var onItem = function (id) { return function (dispatch) {
    //  return {'type': types.IN_ITEM, id: id};
}; };
export var getItem = function (index) { return function (dispatch) {
    var userId = { userId: index };
    api.getItem(userId).then(function (result) {
        var itemB = result['data'];
        dispatch({
            type: types.GET_ITEM,
            item: itemB,
            id: index,
        });
        //browserHistory.push(`/profiles/${index}`);
    }, function (error) {
        console.log('err');
        console.log(error);
    });
}; };
export var getVideo = function () { return function (dispatch) {
    api.getVideo([]).then(function (result) {
        var videoBase = result['data'];
        dispatch({
            type: types.GET_VIDEO,
            video: videoBase,
        });
    }, function (error) {
        console.log('err');
        console.log(error);
    });
}; };
export var addVideo = function (data, dispatch) {
    var bdata = [data.name, data.src];
    api.addVideo(bdata).then(function (result) {
        var id = result.data['_id'];
        dispatch({
            type: types.ADD_VIDEO,
            name: data.name,
            id: id,
            src: data.src,
        });
    });
};
export var delVideo = function (idBase) {
    var bdata = { id: idBase };
    return function (dispatch) {
        return api
            .delVideo(bdata)
            .then(function (response) {
            console.log('res', response);
            dispatch({
                type: types.DEL_VIDEO,
                id: idBase,
            });
        })
            .catch(function (error) {
            throw error;
        });
    };
};
export var delItem = function (idBase) {
    var bdata = { id: idBase };
    api.delItem(bdata).then(function (result) {
        browserHistory.push('/profiles');
    }, function (error) {
        console.log('err');
        console.log(error);
    });
    return {
        type: types.DEL_ITEM,
        id: idBase,
    };
};
export var list = function (id, list) {
    var bdata = [id, list];
    api.list(bdata);
    return {
        type: types.LIST,
        list: list,
        id: id,
    };
};
export var choose = function (id, choose) {
    return {
        type: types.CHOOSE,
        id: id,
        choose: choose,
    };
};
export var on = function (id) {
    return {
        type: types.ON,
        id: id,
    };
};
export var quickSearch = function (name) {
    return api.getItems(name);
};
export var clearSearch = function (name) {
    return {
        type: types.FULL_SEARCH,
        name: false
    };
};
export var fullSearch = function (name) {
    browserHistory.push('/profiles');
    return {
        type: types.FULL_SEARCH,
        name: name
    };
};
export var off = function (id) {
    return {
        type: types.OFF,
        id: id,
    };
};
export var updateItem = function (data, id) {
    return {
        type: types.UPDATE_ITEM,
        data: data,
        idBase: id,
    };
};
