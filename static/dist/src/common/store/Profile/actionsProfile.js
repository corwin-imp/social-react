"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Types = tslib_1.__importStar(require("../../constants/ActionTypes-items"));
const api_1 = tslib_1.__importDefault(require("../../api"));
const files_1 = tslib_1.__importDefault(require("../../modules/files"));
const history_1 = require("../../services/history");
const socket_io_client_1 = tslib_1.__importDefault(require("socket.io-client"));
const types = Types;
const socket = socket_io_client_1.default('', { path: '/api/chat' });
let request = require('superagent');
const redux_actions_1 = require("redux-actions");
const react_cookie_1 = tslib_1.__importDefault(require("react-cookie"));
const api = api_1.default;
const _Cookies = react_cookie_1.default;
const cookie = new _Cookies();
exports.addItem = redux_actions_1.createAction(types.ADD, (data) => {
    let profile = {
        local: {
            username: data.name,
        },
    };
    return {
        item: profile,
        name: data.name,
    };
});
exports.setSongAction = redux_actions_1.createAction(types.CHOOSE, (song) => {
    return {
        song,
    };
});
exports.removeFileAction = redux_actions_1.createAction(types.REMOVE_FILE, ({ file, typeFile }) => {
    return {
        file,
        typeFile
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
exports.setSong = (song) => (dispatch) => {
    dispatch(exports.setSongAction(song));
};
exports.removeFile = (type, file, index) => (dispatch) => {
    api.removeFile({ type: type, 'file': file }).then(() => {
        dispatch(exports.removeFileAction({ file: index,
            typeFile: type }));
    }, (error) => {
        console.log('err');
        console.log(error);
    });
};
exports.addFile = (file, type) => (dispatch) => {
    api.add({ type: type, 'file': file }).then(() => {
        console.log('done');
        //browserHistory.push(`/profiles/${index}`);
    }, (error) => {
        console.log('err');
        console.log(error);
    });
};
exports.getFiles = (some) => (dispatch) => {
    files_1.default(some, (err, files) => {
        if (files.length) {
            var someVar = some.toUpperCase().replace('-', '_');
            dispatch({
                type: types[someVar],
                files: files,
            });
        }
    });
};
exports.getItems = (dispatch) => {
    const userId = cookie.load('userId');
    api.getItems([])
        .then((result) => {
        let itemsBase = result['data'];
        let newItems = new Map();
        let ids = [];
        itemsBase.forEach(function (item) {
            let user = item['local'];
            if (item._id == userId) {
                return;
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
            };
            newItem['dataId'] = item._id;
            ids.push(item._id);
            newItems.set(item._id, newItem);
        });
        let dataTHen = { ids, newItems };
        return dataTHen;
    }, (error) => {
        console.log('err');
        console.log(error);
    })
        .then((dataTHen) => {
        let ids = dataTHen.ids;
        socket.emit('get users', ids);
        socket.on('server users', function (message) {
            var people = JSON.parse(message);
            let NewMap = new Map();
            for (let value of dataTHen.newItems) {
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
exports.offItem = (id) => {
    socket.emit('leave user', id);
    return {
        type: types.LEAVE_ITEM,
        id: id,
    };
};
exports.onItem = (id) => (dispatch) => {
    //  return {'type': types.IN_ITEM, id: id};
};
exports.getItem = (index) => (dispatch) => {
    let userId = { userId: index };
    api.getItem(userId).then((result) => {
        let itemB = result['data'];
        dispatch({
            type: types.GET_ITEM,
            item: itemB,
            id: index,
        });
        //browserHistory.push(`/profiles/${index}`);
    }, (error) => {
        console.log('err');
        console.log(error);
    });
};
exports.getVideo = () => (dispatch) => {
    api.getVideo([]).then((result) => {
        let videoBase = result['data'];
        dispatch({
            type: types.GET_VIDEO,
            video: videoBase,
        });
    }, (error) => {
        console.log('err');
        console.log(error);
    });
};
exports.addVideo = (data, dispatch) => {
    let bdata = [data.name, data.src];
    api.addVideo(bdata).then((result) => {
        let id = result.data['_id'];
        dispatch({
            type: types.ADD_VIDEO,
            name: data.name,
            id: id,
            src: data.src,
        });
    });
};
exports.delVideo = (idBase) => {
    let bdata = { id: idBase };
    return (dispatch) => {
        return api
            .delVideo(bdata)
            .then((response) => {
            console.log('res', response);
            dispatch({
                type: types.DEL_VIDEO,
                id: idBase,
            });
        })
            .catch((error) => {
            throw error;
        });
    };
};
exports.delItem = (idBase) => {
    let bdata = { id: idBase };
    api.delItem(bdata).then(() => {
        history_1.browserHistory.push('/profiles');
    }, (error) => {
        console.log('err');
        console.log(error);
    });
    return {
        type: types.DEL_ITEM,
        id: idBase,
    };
};
exports.list = (id, list) => {
    let bdata = [id, list];
    api.list(bdata);
    return {
        type: types.LIST,
        list,
        id,
    };
};
exports.choose = (id, choose) => {
    return {
        type: types.CHOOSE,
        id,
        choose,
    };
};
exports.on = (id) => {
    return {
        type: types.ON,
        id,
    };
};
exports.quickSearch = (name) => {
    return api.getItems(name);
};
exports.clearSearch = (name) => {
    return {
        type: types.FULL_SEARCH,
        name: false
    };
};
exports.fullSearch = (name) => {
    history_1.browserHistory.push('/profiles');
    return {
        type: types.FULL_SEARCH,
        name: name
    };
};
exports.off = (id) => {
    return {
        type: types.OFF,
        id,
    };
};
exports.updateItem = (data, id) => {
    return {
        type: types.UPDATE_ITEM,
        data: data,
        idBase: id,
    };
};
