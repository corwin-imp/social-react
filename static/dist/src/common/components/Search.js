import * as tslib_1 from "tslib";
import React from "react";
import * as actions from "../store/Profile/actionsProfile";
import { Button, Form } from "react-bootstrap";
import InputMy from "./Input";
import FontAwesome from "react-fontawesome";
import ItemsList from "./ItemsList";
var Search = /** @class */ (function (_super) {
    tslib_1.__extends(Search, _super);
    function Search(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            searchName: _this.props.findSearch ? _this.props.findSearch : "",
            nameSend: _this.props.findSearch ? 1 : 0,
            items: []
            //  age: "",
            //  gender: "male",
            //  email: "",
        };
        _this.onSearch = _this.onSearch.bind(_this);
        _this.searchItems = _this.searchItems.bind(_this);
        _this.findFUll = _this.findFUll.bind(_this);
        _this.onFullSearch = _this.onFullSearch.bind(_this);
        _this.getItem = _this.getItem.bind(_this);
        return _this;
    }
    Search.prototype.onFullSearch = function (event) {
        var value = event.target.value;
        this.setState({
            searchName: value
        });
    };
    Search.prototype.findFUll = function () {
        var NameSend = 0;
        if (this.state.searchName) {
            NameSend = 1;
        }
        this.setState({
            nameSend: NameSend
        });
        var findObj = {
            name: this.state.searchName
        };
        console.log(111);
        this.props.onFindSearch(findObj);
    };
    Search.prototype.onSearch = function (event) {
        var _this = this;
        console.log(111);
        var value = event.target.value;
        this.setState({
            searchName: value
        });
        if (value.length > 2) {
            actions.quickSearch({ name: value }).then(function (result) {
                var itemsBase = result["data"];
                if (itemsBase.length) {
                    var newItems_1 = new Map();
                    var ids_1 = [];
                    itemsBase.forEach(function (item, i, arr) {
                        var user = item["local"];
                        if (item._id == _this.props.userId) {
                            return;
                        }
                        var newItem = {
                            name: user.username,
                            city: user.city,
                            picture: user.picture,
                            country: user.country
                        };
                        newItem["dataId"] = item._id;
                        ids_1.push(item._id);
                        newItems_1.set(item._id, newItem);
                    });
                    _this.setState({
                        items: newItems_1
                    });
                }
                else {
                    _this.setState({
                        items: []
                    });
                }
            }, function (error) {
                console.log("err");
                console.log(error);
            });
        }
        else {
            this.setState({
                items: []
            });
        }
    };
    Search.prototype.searchItems = function () {
        if (this.state.searchName) {
            var dispatch = this.props.dispatch;
            dispatch(actions.fullSearch(this.state.searchName));
            console.log("search");
        }
    };
    Search.prototype.getItem = function (item, id) {
        this.setState({
            searchName: "",
            items: []
        });
        var dispatch = this.props.dispatch;
        dispatch(actions.getItem(item, id));
    };
    Search.prototype.render = function () {
        if (this.props.fullSearch) {
            return (React.createElement("div", { id: "searchForm", className: "form-inline" },
                React.createElement("div", { className: "form-group searchCont" },
                    React.createElement(InputMy, { placeholder: "Find", type: "text", name: "searchName", placeholder: "Find", onKeyPress: this.findFUll, value: this.state.searchName, onChange: this.onFullSearch }),
                    React.createElement(Button, { className: "btnSearch " + (this.state.nameSend ? " act" : "") + " ", onClick: this.findFUll, type: "button" },
                        React.createElement(FontAwesome, { className: "super-crazy-colors", name: "search", size: "lg" })))));
        }
        else {
            return (React.createElement("div", { id: "searchForm", className: "form-inline" },
                React.createElement("div", { className: "form-group searchCont" },
                    React.createElement(FontAwesome, { className: "super-crazy-colors", name: "search", size: "lg" }),
                    React.createElement(Form.Control, { placeholder: "Find", value: this.state.searchName, onChange: this.onSearch, autoFocus: false, name: "searchName", hasfeedback: "true", type: "text", ref: "friendName" })),
                this.state.items.size ? (React.createElement(ItemsList, tslib_1.__assign({}, this.props, { className: "simle", items: this.state.items, getItem: this.getItem }))) : (""),
                this.state.searchName && (React.createElement(Button, { className: "btnSearch", onClick: this.searchItems, type: "button" }, "View All"))));
        }
    };
    return Search;
}(React.Component));
export default Search;
