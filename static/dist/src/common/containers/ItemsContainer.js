import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemsList from './../components/ItemsList';
import Filter from './../components/Filter';
import Search from '../components/Search';
import * as actions from '../store/Profile/actionsProfile';
import io from 'socket.io-client';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
var socket = io('', { path: '/api/chat' });
var ItemsContainer = /** @class */ (function (_super) {
    tslib_1.__extends(ItemsContainer, _super);
    function ItemsContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            itemsFind: _this.props.items,
            findSearch: _this.props.findSearch,
            ageTo: '',
            'ageFr': '',
            'name': '',
            'local.gender': '',
            'country': '',
            'countrySend': 0,
            'citySend': 0,
            'city': '',
        };
        _this.find = _this.find.bind(_this);
        _this.fromFilter = _this.fromFilter.bind(_this);
        _this.fromSearch = _this.fromSearch.bind(_this);
        _this.handleKeyPress = _this.handleKeyPress.bind(_this);
        console.log('mount');
        return _this;
    }
    ItemsContainer.prototype.handleKeyPress = function () {
        var obj = this.state;
        obj['local.city'] = obj.city;
        obj['local.country'] = obj.country;
        delete obj.itemsFind;
        delete obj.countrySend;
        delete obj.country;
        delete obj.citySend;
        delete obj.city;
        console.log('send', this.state);
        this.find(this.state);
    };
    ItemsContainer.prototype.fromSearch = function (obj) {
        console.log(222);
        this.setState({
            findSearch: obj.name,
        });
        var newObj = {
            'ageTo': this.state.ageTo,
            'ageFr': this.state.ageFr,
            'name': obj.name,
            'local.gender': this.state['local.gender'],
            'local.country': this.state['country'],
            'local.city': this.state['city'],
        };
        console.log('newObj', newObj);
        this.find(newObj);
    };
    ItemsContainer.prototype.fromFilter = function (obj) {
        console.log(333);
        var newObj = {
            'ageTo': obj.ageTo,
            'ageFr': obj.ageFr,
            'name': this.state.findSearch,
            'local.gender': obj.gender,
            'local.country': this.state.country,
            'local.city': this.state.city,
        };
        this.find(newObj);
    };
    ItemsContainer.prototype.onCountry = function (event) {
        console.log('count', event.target.value);
        this.setState({
            country: event.target.value,
        });
    };
    ItemsContainer.prototype.onCity = function (event) {
        this.setState({
            city: event.target.value,
        });
    };
    ItemsContainer.prototype.find = function (find) {
        var _this = this;
        console.log('find', find);
        var citySend = 0;
        var countrySend = 0;
        if (this.state.city) {
            citySend = 1;
        }
        if (this.state.country) {
            countrySend = 1;
        }
        this.setState({
            'countrySend': countrySend,
            'citySend': citySend,
        });
        console.log(444);
        for (var item in find) {
            if (!find[item]) {
                delete find[item];
            }
        }
        actions.quickSearch(find).then(function (result) {
            var itemsBase = result['data'];
            if (itemsBase.length) {
                var newItems_1 = new Map();
                var ids_1 = [];
                itemsBase.forEach(function (item, i, arr) {
                    var user = item['local'];
                    if (item._id == _this.props.user.id) {
                        return;
                    }
                    var newItem = {
                        name: user.username,
                        city: user.city,
                        picture: user.picture,
                        country: user.country,
                    };
                    newItem['dataId'] = item._id;
                    ids_1.push(item._id);
                    newItems_1.set(item._id, newItem);
                });
                /*socket.emit('get users', ids)
                socket.on('server users', (message)=> {
                  var people = JSON.parse(message)
              
                  let NewMap = new Map()
                  for (let value of newItems) {
                    if (people.indexOf(value[0]) != -1) {
                      var status = 1
                    } else {
                      var status = 0
                    }
              
                    value[1].status = status
                    NewMap.set(value['0'], value[1])
                  }
                  console.log('onErr',this.props);
                  this.setState({
                    itemsFind: NewMap
                  });
              
                })*/
                _this.setState({
                    itemsFind: newItems_1
                });
            }
            else {
                _this.setState({
                    itemsFind: []
                });
            }
        }, function (error) {
            console.log('err');
            console.log(error);
        });
    };
    ItemsContainer.prototype.componentDidMount = function () {
        if (this.props.findSearch) {
            console.log('search', this.props.findSearch);
            this.find({ name: this.props.findSearch });
        }
    };
    ItemsContainer.prototype.componentWillUnmount = function () {
        var dispatch = this.props.dispatch;
        console.log('unmount');
        dispatch(actions.clearSearch(false));
    };
    /*  componentWillMount(){
        const { findSearch } = this.props
        if(findSearch){
    
          this.findSearch({ name: findSearch });
    
        }
      }*/
    /*  componentDidUpdate(prevProps, prevState){
    console.log('props',this.state);
        if(!this.state.itemsFind.size && this.props.items.size && this.state.findSearch ){
          console.log('find',this.props.items);
          this.setState({
            itemsFind: this.props.items
          })
        }
      }*/
    ItemsContainer.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { id: "profilesPage" },
            React.createElement(KeyHandler, { keyEventName: KEYPRESS, keyValue: "Enter", onKeyHandle: this.handleKeyPress }),
            React.createElement("div", { className: "mainPart part" },
                React.createElement("div", { className: "fullSearch stickyPart" },
                    React.createElement(Search, { onFindSearch: function (obj) { return _this.fromSearch(obj); }, fullSearch: true, findSearch: this.props.findSearch, dispatch: this.props.dispatch, userId: this.props.user.id })),
                React.createElement(ItemsList, tslib_1.__assign({}, this.props, { items: this.state.itemsFind, delItem: this.props.delItem, getItem: this.props.getItem }))),
            React.createElement("div", { className: "rightSide part" },
                React.createElement("div", { className: "stickyPart" },
                    React.createElement(Filter, { onCity: this.onCity.bind(this), onCountry: this.onCountry.bind(this), citySend: this.state.citySend, countrySend: this.state.countrySend, onFindSearch: function (obj) { return _this.fromFilter(obj); }, params: this.props.params })))));
    };
    return ItemsContainer;
}(Component));
var mapStateToProps = function (state) {
    return {
        state: state.reducerItems,
        items: state.reducerItems.items,
        item: state.reducerItems.item,
        findSearch: state.reducerItems.findSearch,
        params: [],
        user: state.auth.user,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        addItem: function (data) { return dispatch(actions.addItem(data)); },
        delItem: function (name) { return dispatch(actions.delItem(id)); },
        getItem: function (item, id) { return dispatch(actions.getItem(item, id)); },
        getItems: function () { return dispatch(getItems()); },
        dispatch: dispatch,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
