import * as tslib_1 from "tslib";
import React from 'react';
import Input from './Input';
import Button from './Button';
var AddItem = /** @class */ (function (_super) {
    tslib_1.__extends(AddItem, _super);
    function AddItem(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            name: '',
        };
        _this.onName = _this.onName.bind(_this);
        _this.onEmail = _this.onEmail.bind(_this);
        _this.onAge = _this.onAge.bind(_this);
        _this.onGender = _this.onGender.bind(_this);
        return _this;
    }
    AddItem.prototype.onName = function (event) {
        this.setState({
            name: event.target.value,
        });
    };
    AddItem.prototype.onEmail = function (event) {
        this.setState({
            email: event.target.value,
        });
    };
    AddItem.prototype.onAge = function (event) {
        this.setState({
            age: event.target.value,
        });
    };
    AddItem.prototype.onGender = function (event) {
        this.setState({
            gender: event.target.value,
        });
    };
    AddItem.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { class: "addItem" },
            React.createElement("form", { className: "form-inline", role: "form" },
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { htmlFor: "device", className: "sr-only" },
                        this.props.value,
                        ":",
                        ' '),
                    React.createElement(Input, { id: "name", type: "text", onChange: this.onName, value: this.state.name })),
                React.createElement(Button, { onClick: function () { return _this.props.addItem(_this.state); }, text: "Add" }))));
    };
    return AddItem;
}(React.Component));
export default AddItem;
