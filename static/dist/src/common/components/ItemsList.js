import * as tslib_1 from "tslib";
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
var ItemsList = /** @class */ (function (_super) {
    tslib_1.__extends(ItemsList, _super);
    function ItemsList(props, context) {
        return _super.call(this, props, context) || this;
    }
    ItemsList.prototype.render = function () {
        var _this = this;
        var itemsArr = [];
        if (!this.props.items) {
            return false;
        }
        if (Object.keys(this.props.items).length || this.props.items.size) {
            for (var _i = 0, _a = this.props.items; _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                itemsArr.push(value);
            }
        }
        if (this.props.selectItem) {
            return (React.createElement("div", { className: "itemList " + this.props.className + " itemsSelect " }, itemsArr.map(function (value, index) { return (React.createElement("div", { className: "itemLink", key: index, onClick: function (e) { return _this.props.selectItem(e, value); } },
                React.createElement("div", { className: "imageItem" },
                    React.createElement("img", { src: value.picture
                            ? value.picture
                            : require('../images/profile.png'), width: "60", height: "60" })),
                React.createElement("div", { className: "itemName" }, value.name),
                value.status ? React.createElement("div", { className: "status" }) : '')); })));
        }
        else {
            return (React.createElement("div", { className: "itemList " + this.props.className }, itemsArr.map(function (value, index) { return (React.createElement("div", { className: "item", key: index },
                React.createElement(Link, { className: "itemLink", to: "/profiles/" + value.dataId, onClick: function () { return _this.props.getItem(value.dataId); } },
                    React.createElement("div", { className: "imageItem" },
                        React.createElement("img", { src: value.picture
                                ? value.picture
                                : require('../images/profile.png'), width: "125", height: "125" })),
                    React.createElement("div", { className: "itemInfo" },
                        React.createElement("div", { className: "itemName" }, value.name),
                        React.createElement("div", { className: "itemprop" },
                            value.country,
                            (value.city) && ", " + value.city)),
                    value.status ? React.createElement("div", { className: "status" }) : ''),
                React.createElement("div", { className: "itemButtons" },
                    React.createElement(Button, { bsStyle: "primary" }, "Add Contact")))); })));
        }
    };
    return ItemsList;
}(React.Component));
export default ItemsList;
