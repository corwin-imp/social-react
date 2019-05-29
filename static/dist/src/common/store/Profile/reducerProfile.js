"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Profile_1 = tslib_1.__importDefault(require("./Profile"));
const types = tslib_1.__importStar(require("../../constants/ActionTypes-items"));
const api_1 = tslib_1.__importDefault(require("../../api"));
const history_1 = require("../../services/history");
let newItems = new Map();
const initialState = {
    items: newItems,
    nameDuplicate: false,
};
const reducerProfile = (state = initialState, action) => {
    let newItems;
    switch (action.type) {
        case types.ADD:
            let flagName = true;
            for (let value of state.items.values()) {
                if (value.name == action.name) {
                    flagName = false;
                }
            }
            if (flagName) {
                newItems = new Map();
                for (let item of state.items.keys()) {
                    newItems.set(item, state.items.get(item));
                }
                let newItem = new Profile_1.default(action.item);
                let id = newItems.size + 1;
                newItems.set(id, newItem);
                let bdata = [action.item];
                let promice = new Promise(function (resolve, reject) {
                    api_1.default.addItem(bdata);
                });
                let newState = {
                    ...state,
                    items: newItems,
                    nameDuplicate: false,
                };
                return newState;
            }
            else {
                let newState = Object.assign({}, state);
                newState.nameDuplicate = true;
                return newState;
            }
            break;
        case types.LIST:
            newItems = new Map();
            for (let item of state.items.keys()) {
                newItems.set(item, state.items.get(item));
            }
            newItems.get(action.name).list = action.list;
            return {
                ...state,
                items: newItems,
                nameDuplicate: false,
            };
            break;
        case types.LEAVE_ITEM:
            if (state.items.size) {
                var ItemsNEw = state.items;
                var updateStat = ItemsNEw.get(action.id);
                updateStat.status = 0;
                ItemsNEw.set(action.id, updateStat);
                return {
                    ...state,
                    items: newItems,
                };
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
                return {
                    ...state,
                    items: newItems,
                };
            }
            else {
                return state;
            }
            break;
        case types.DEL_ITEM:
            newItems = new Map();
            for (let item of state.items.keys()) {
                newItems.set(item, state.items.get(item));
            }
            newItems.delete(action.id);
            return {
                ...state,
                items: newItems,
                nameDuplicate: false,
            };
            break;
        case types.CHOOSE:
            newItems = new Map();
            for (let item of state.items.keys()) {
                newItems.set(item, state.items.get(item));
            }
            newItems.get(action.id).choose = action.choose;
            return {
                ...state,
                items: newItems,
                nameDuplicate: false,
            };
            break;
        case types.UPDATE_ITEM:
            let user = action.data;
            let updateItem = {
                name: user.name,
                age: user.age,
                gender: user.gender,
                email: user.email,
                city: user.city,
                country: user.country,
            };
            let dataItem = {
                local: {
                    username: user.name,
                    age: user.age,
                    gender: user.gender,
                    email: user.email,
                    city: user.city,
                    country: user.country,
                },
            };
            let newItem = new Profile_1.default(dataItem);
            state.items.set(action.data.dataItem, updateItem);
            let bdata = { data: updateItem, id: action.idBase };
            let promice = new Promise(function (resolve, reject) {
                api_1.default.updateItem(bdata).then(result => {
                    history_1.browserHistory.push(`/profiles/${action.idBase}`);
                }, error => {
                    console.log('err');
                    console.log(error);
                });
            });
            promice.then(result => {
                console.log('createToBase');
            });
            let newState = {
                ...state,
                items: state.items,
                item: newItem,
                nameDuplicate: false,
            };
            return newState;
            break;
        case types.GET_ITEM:
            let baseS = {
                ...state,
            };
            if (typeof action.item != 'string') {
                var thisItem = state.items.get(action.id);
                if (thisItem) {
                    action.status = thisItem.status;
                }
                let newItem = new Profile_1.default(action.item);
                baseS = {
                    ...state,
                    item: newItem,
                };
            }
            console.log('baseS', baseS);
            return baseS;
            break;
        case types.FULL_SEARCH:
            return {
                ...state,
                findSearch: action.name,
            };
            break;
        case types.GET_ITEMS:
            return {
                ...state,
                items: action.items,
            };
            break;
        default:
            if (state.items == []) {
                reducerProfile(initialState, { type: types.GET_ITEMS });
            }
            return state;
    }
};
exports.default = reducerProfile;
