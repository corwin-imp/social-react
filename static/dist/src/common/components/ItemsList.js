"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_bootstrap_1 = require("react-bootstrap");
class ItemsList extends react_1.default.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        let itemsArr = [];
        if (!this.props.items) {
            return false;
        }
        if (Object.keys(this.props.items).length || this.props.items.size) {
            for (let [key, value] of this.props.items) {
                itemsArr.push(value);
            }
        }
        if (this.props.selectItem) {
            return (react_1.default.createElement("div", { className: `itemList ${this.props.className} itemsSelect ` }, itemsArr.map((value, index) => (react_1.default.createElement("div", { className: "itemLink", key: index, onClick: e => this.props.selectItem(e, value) },
                react_1.default.createElement("div", { className: "imageItem" },
                    react_1.default.createElement("img", { src: value.picture
                            ? value.picture
                            : require('../images/profile.png'), width: "60", height: "60" })),
                react_1.default.createElement("div", { className: "itemName" }, value.name),
                value.status ? react_1.default.createElement("div", { className: "status" }) : '')))));
        }
        else {
            return (react_1.default.createElement("div", { className: `itemList ${this.props.className}` }, itemsArr.map((value, index) => (react_1.default.createElement("div", { className: "item", key: index },
                react_1.default.createElement(react_router_dom_1.Link, { className: "itemLink", to: `/profiles/${value.dataId}`, onClick: () => this.props.getItem(value.dataId) },
                    react_1.default.createElement("div", { className: "imageItem" },
                        react_1.default.createElement("img", { src: value.picture
                                ? value.picture
                                : require('../images/profile.png'), width: "125", height: "125" })),
                    react_1.default.createElement("div", { className: "itemInfo" },
                        react_1.default.createElement("div", { className: "itemName" }, value.name),
                        react_1.default.createElement("div", { className: "itemprop" },
                            value.country,
                            (value.city) && `, ${value.city}`)),
                    value.status ? react_1.default.createElement("div", { className: "status" }) : ''),
                react_1.default.createElement("div", { className: "itemButtons" },
                    react_1.default.createElement(react_bootstrap_1.Button, { bsStyle: "primary" }, "Add Contact")))))));
        }
    }
}
exports.default = ItemsList;
