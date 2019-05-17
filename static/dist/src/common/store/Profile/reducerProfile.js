import * as tslib_1 from "tslib";
import Profile from './Profile';
import * as types from '../../constants/ActionTypes-items';
import api from '../../api';
import { browserHistory } from 'react-router';
var newItems = new Map();
var initialState = {
    items: newItems,
    nameDuplicate: false,
};
var reducerProfile = function (state, action) {
    if (state === void 0) { state = initialState; }
    var newItems;
    switch (action.type) {
        case types.ADD:
            var flagName = true;
            for (var _i = 0, _a = state.items.values(); _i < _a.length; _i++) {
                var value = _a[_i];
                if (value.name == action.name) {
                    flagName = false;
                }
            }
            if (flagName) {
                newItems = new Map();
                for (var _b = 0, _c = state.items.keys(); _b < _c.length; _b++) {
                    var item = _c[_b];
                    newItems.set(item, state.items.get(item));
                }
                var newItem_1 = new Profile(action.item);
                var id = newItems.size + 1;
                newItems.set(id, newItem_1);
                var bdata_1 = [action.item];
                var promice_1 = new Promise(function (resolve, reject) {
                    api.addItem(bdata_1);
                });
                var newState_1 = tslib_1.__assign({}, state, { items: newItems, nameDuplicate: false });
                return newState_1;
            }
            else {
                var newState_2 = Object.assign({}, state);
                newState_2.nameDuplicate = true;
                return newState_2;
            }
            break;
        case types.LIST:
            newItems = new Map();
            for (var _d = 0, _e = state.items.keys(); _d < _e.length; _d++) {
                var item = _e[_d];
                newItems.set(item, state.items.get(item));
            }
            newItems.get(action.name).list = list;
            return tslib_1.__assign({}, state, { items: newItems, nameDuplicate: false });
            break;
        case types.LEAVE_ITEM:
            if (state.items.size) {
                var ItemsNEw = state.items;
                var updateStat = ItemsNEw.get(action.id);
                updateStat.status = 0;
                ItemsNEw.set(action.id, updateStat);
                return tslib_1.__assign({}, state, { items: newItems });
            }
            else {
                return state;
            }
            break;
        case types.IN_ITEM:
            if (state.items.size) {
                var ItemsNEw = state.items;
                var updateStat = ItemsNEw.get(action.id);
                updateStat.status = 1;
                ItemsNEw.set(action.id, updateStat);
                return tslib_1.__assign({}, state, { items: newItems });
            }
            else {
                return state;
            }
            break;
        case types.DEL_ITEM:
            newItems = new Map();
            for (var _f = 0, _g = state.items.keys(); _f < _g.length; _f++) {
                var item = _g[_f];
                newItems.set(item, state.items.get(item));
            }
            newItems.delete(action.id);
            return tslib_1.__assign({}, state, { items: newItems, nameDuplicate: false });
            break;
        case types.CHOOSE:
            newItems = new Map();
            for (var _h = 0, _j = state.items.keys(); _h < _j.length; _h++) {
                var item = _j[_h];
                newItems.set(item, state.items.get(item));
            }
            newItems.get(action.id).choose = choose;
            return tslib_1.__assign({}, state, { items: newItems, nameDuplicate: false });
            break;
        case types.UPDATE_ITEM:
            var user = action.data;
            var updateItem = {
                name: user.name,
                age: user.age,
                gender: user.gender,
                email: user.email,
                city: user.city,
                country: user.country,
            };
            var dataItem = {
                local: {
                    username: user.name,
                    age: user.age,
                    gender: user.gender,
                    email: user.email,
                    city: user.city,
                    country: user.country,
                },
            };
            var newItem = new Profile(dataItem);
            state.items.set(action.data.dataItem, updateItem);
            var bdata_2 = { data: updateItem, id: action.idBase };
            var promice = new Promise(function (resolve, reject) {
                api.updateItem(bdata_2).then(function (result) {
                    browserHistory.push("/profiles/" + action.idBase);
                }, function (error) {
                    console.log('err');
                    console.log(error);
                });
            });
            promice.then(function (result) {
                console.log('createToBase');
            });
            var newState = tslib_1.__assign({}, state, { items: state.items, item: newItem, nameDuplicate: false });
            return newState;
            break;
        case types.GET_ITEM:
            var baseS = tslib_1.__assign({}, state);
            if (typeof action.item != 'string') {
                var thisItem = state.items.get(action.id);
                if (thisItem) {
                    action.status = thisItem.status;
                }
                var newItem_2 = new Profile(action.item);
                baseS = tslib_1.__assign({}, state, { item: newItem_2 });
            }
            console.log('baseS', baseS);
            return baseS;
            break;
        case types.FULL_SEARCH:
            return tslib_1.__assign({}, state, { findSearch: action.name });
            break;
        case types.GET_ITEMS:
            return tslib_1.__assign({}, state, { items: action.items });
            break;
        default:
            if (state.items == []) {
                reducerProfile({ type: types.GET_ITEMS });
            }
            return state;
    }
};
export default reducerProfile;
