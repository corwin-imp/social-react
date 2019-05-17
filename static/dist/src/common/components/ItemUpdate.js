import * as tslib_1 from "tslib";
import React from 'react';
import { Input } from 'react-bootstrap';
import Button from './Button';
var ItemUpdate = /** @class */ (function (_super) {
    tslib_1.__extends(ItemUpdate, _super);
    function ItemUpdate(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            name: _this.props.item.name,
            age: _this.props.item.age,
            gender: 'male',
            email: _this.props.item.email,
            city: _this.props.item.city,
            country: _this.props.item.country,
            idItem: _this.props.idItem,
        };
        _this.onName = _this.onName.bind(_this);
        _this.onEmail = _this.onEmail.bind(_this);
        _this.onAge = _this.onAge.bind(_this);
        _this.onGender = _this.onGender.bind(_this);
        _this.onCountry = _this.onCountry.bind(_this);
        _this.onCity = _this.onCity.bind(_this);
        return _this;
    }
    ItemUpdate.prototype.onName = function (event) {
        this.setState({
            name: event.target.value,
        });
    };
    ItemUpdate.prototype.onEmail = function (event) {
        this.setState({
            email: event.target.value,
        });
    };
    ItemUpdate.prototype.onAge = function (event) {
        this.setState({
            age: event.target.value,
        });
    };
    ItemUpdate.prototype.onGender = function (event) {
        this.setState({
            gender: event.target.value,
        });
    };
    ItemUpdate.prototype.onCountry = function (event) {
        this.setState({
            country: event.target.value,
        });
    };
    ItemUpdate.prototype.onCity = function (event) {
        this.setState({
            city: event.target.value,
        });
    };
    ItemUpdate.prototype.render = function () {
        var _this = this;
        return (React.createElement("form", { role: "form" },
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "name" }, "Name:"),
                React.createElement(Input, { id: "name", className: "form-control", type: "text", onChange: this.onName, value: this.state.name })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "email" }, "Email"),
                React.createElement(Input, { id: "email", className: "form-control", type: "text", onChange: this.onEmail, value: this.state.email })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "city" }, "City:"),
                React.createElement(Input, { id: "city", className: "form-control", type: "text", onChange: this.onCity, value: this.state.city })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "country" }, "Country:"),
                React.createElement(Input, { id: "country", className: "form-control", type: "text", onChange: this.onCountry, value: this.state.country })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "age" }, "Age: "),
                React.createElement(Input, { id: "age", min: "0", className: "form-control", type: "number", onChange: this.onAge, value: this.state.age })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "gender" }, "Gender: "),
                React.createElement("select", { id: "gender", className: "form-control", onChange: this.onGender, value: this.state.Selected },
                    React.createElement("option", { value: "male" }, "male"),
                    React.createElement("option", { value: "female" }, "female"))),
            React.createElement(Button, { onClick: function () { return _this.props.updateItem(_this.state, _this.props.item.id); }, text: "Update" })));
    };
    return ItemUpdate;
}(React.Component));
export default ItemUpdate;
