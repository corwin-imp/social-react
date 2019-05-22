"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const actions = tslib_1.__importStar(require("../store/Profile/actionsProfile"));
const react_bootstrap_1 = require("react-bootstrap");
const Input_1 = tslib_1.__importDefault(require("./Input"));
const react_fontawesome_1 = tslib_1.__importDefault(require("react-fontawesome"));
const ItemsList_1 = tslib_1.__importDefault(require("./ItemsList"));
class Search extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchName: this.props.findSearch ? this.props.findSearch : "",
            nameSend: this.props.findSearch ? 1 : 0,
            items: []
            //  age: "",
            //  gender: "male",
            //  email: "",
        };
        this.onSearch = this.onSearch.bind(this);
        this.searchItems = this.searchItems.bind(this);
        this.findFUll = this.findFUll.bind(this);
        this.onFullSearch = this.onFullSearch.bind(this);
        this.getItem = this.getItem.bind(this);
    }
    onFullSearch(event) {
        let value = event.target.value;
        this.setState({
            searchName: value
        });
    }
    findFUll() {
        let NameSend = 0;
        if (this.state.searchName) {
            NameSend = 1;
        }
        this.setState({
            nameSend: NameSend
        });
        const findObj = {
            name: this.state.searchName
        };
        console.log(111);
        this.props.onFindSearch(findObj);
    }
    onSearch(event) {
        console.log(111);
        let value = event.target.value;
        this.setState({
            searchName: value
        });
        if (value.length > 2) {
            actions.quickSearch({ name: value }).then(result => {
                let itemsBase = result["data"];
                if (itemsBase.length) {
                    let newItems = new Map();
                    let ids = [];
                    itemsBase.forEach((item, i, arr) => {
                        let user = item["local"];
                        if (item._id == this.props.userId) {
                            return;
                        }
                        let newItem = {
                            name: user.username,
                            city: user.city,
                            picture: user.picture,
                            country: user.country
                        };
                        newItem["dataId"] = item._id;
                        ids.push(item._id);
                        newItems.set(item._id, newItem);
                    });
                    this.setState({
                        items: newItems
                    });
                }
                else {
                    this.setState({
                        items: []
                    });
                }
            }, error => {
                console.log("err");
                console.log(error);
            });
        }
        else {
            this.setState({
                items: []
            });
        }
    }
    searchItems() {
        if (this.state.searchName) {
            const { dispatch } = this.props;
            dispatch(actions.fullSearch(this.state.searchName));
            console.log("search");
        }
    }
    getItem(item, id) {
        this.setState({
            searchName: "",
            items: []
        });
        const { dispatch } = this.props;
        dispatch(actions.getItem(item, id));
    }
    render() {
        if (this.props.fullSearch) {
            return (react_1.default.createElement("div", { id: "searchForm", className: "form-inline" },
                react_1.default.createElement("div", { className: "form-group searchCont" },
                    react_1.default.createElement(Input_1.default, { placeholder: "Find", type: "text", name: "searchName", placeholder: "Find", onKeyPress: this.findFUll, value: this.state.searchName, onChange: this.onFullSearch }),
                    react_1.default.createElement(react_bootstrap_1.Button, { className: `btnSearch ${this.state.nameSend ? " act" : ""} `, onClick: this.findFUll, type: "button" },
                        react_1.default.createElement(react_fontawesome_1.default, { className: "super-crazy-colors", name: "search", size: "lg" })))));
        }
        else {
            return (react_1.default.createElement("div", { id: "searchForm", className: "form-inline" },
                react_1.default.createElement("div", { className: "form-group searchCont" },
                    react_1.default.createElement(react_fontawesome_1.default, { className: "super-crazy-colors", name: "search", size: "lg" }),
                    react_1.default.createElement(react_bootstrap_1.Form.Control, { placeholder: "Find", value: this.state.searchName, onChange: this.onSearch, autoFocus: false, name: "searchName", hasfeedback: "true", type: "text", ref: "friendName" })),
                this.state.items.size ? (react_1.default.createElement(ItemsList_1.default, Object.assign({}, this.props, { className: "simle", items: this.state.items, getItem: this.getItem }))) : (""),
                this.state.searchName && (react_1.default.createElement(react_bootstrap_1.Button, { className: "btnSearch", onClick: this.searchItems, type: "button" }, "View All"))));
        }
    }
}
exports.default = Search;
