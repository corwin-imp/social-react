import * as tslib_1 from "tslib";
import React from 'react';
import { Button } from 'react-bootstrap';
import Input from './Input';
import FontAwesome from 'react-fontawesome';
var Filter = /** @class */ (function (_super) {
    tslib_1.__extends(Filter, _super);
    function Filter(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ageFr: '',
            ageTo: '',
            gender: '',
            city: _this.props.city,
            country: _this.props.country,
            countrySend: _this.props.countrySend,
            citySend: _this.props.citySend,
        };
        _this.onAgeFr = _this.onAgeFr.bind(_this);
        _this.onAgeTo = _this.onAgeTo.bind(_this);
        _this.sendTo = _this.sendTo.bind(_this);
        _this.onGender = _this.onGender.bind(_this);
        return _this;
    }
    Filter.prototype.findFull = function (state) {
        console.log('state', state);
        this.props.onFindSearch(state);
    };
    Filter.prototype.sendTo = function () {
        this.props.onFindSearch(this.state);
    };
    Filter.prototype.onAgeFr = function (event) {
        this.setState({
            ageFr: event.target.value,
        });
        this.findFull(tslib_1.__assign({}, this.state, { ageFr: event.target.value }));
    };
    Filter.prototype.onAgeTo = function (event) {
        this.setState({
            ageTo: event.target.value,
        });
        this.findFull(tslib_1.__assign({}, this.state, { ageTo: event.target.value }));
    };
    Filter.prototype.onGender = function (event) {
        this.setState({
            gender: event.target.value,
        });
        this.findFull(tslib_1.__assign({}, this.state, { gender: event.target.value }));
    };
    Filter.prototype.render = function () {
        return (React.createElement("form", { role: "form" },
            React.createElement("b", null, "Country:"),
            React.createElement("div", { className: "form-group formInp" },
                React.createElement(Input, { id: "country", className: "form-control", type: "text", onChange: this.props.onCountry, onKeyPress: this.sendTo, value: this.state.country }),
                React.createElement(Button, { className: "btnSearch " + ((this.props.countrySend) ? ' act' : '') + " ", onClick: this.sendTo },
                    React.createElement(FontAwesome, { className: "super-crazy-colors", name: "search", size: "lg" }))),
            React.createElement("b", null, "City:"),
            React.createElement("div", { className: "form-group formInp" },
                React.createElement(Input, { id: "city", className: "form-control", type: "text", onKeyPress: this.sendTo, onChange: this.props.onCity, value: this.state.city }),
                React.createElement(Button, { className: "btnSearch " + ((this.props.citySend) ? ' act' : '') + " ", onClick: this.sendTo },
                    React.createElement(FontAwesome, { className: "super-crazy-colors", name: "search", size: "lg" }))),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "age" }, "Age: "),
                React.createElement("div", { className: "selects" },
                    React.createElement("span", null, "From:"),
                    React.createElement("select", { id: "ageFr", className: "form-control " + ((this.state.ageFr) ? ' act' : '') + " ", onChange: this.onAgeFr, value: this.state.Selected },
                        React.createElement("option", { value: "" }, "choose"),
                        range(71, 10).map(function (v, k) {
                            return React.createElement("option", { key: v, value: v }, "from " + v);
                        })),
                    React.createElement("span", null, "To:"),
                    React.createElement("select", { id: "ageTo", className: "form-control " + ((this.state.ageTo) ? ' act' : '') + " ", onChange: this.onAgeTo, value: this.state.Selected },
                        React.createElement("option", { value: "" }, "choose"),
                        range(71, 10).map(function (v, k) {
                            return React.createElement("option", { key: v, value: v }, "to " + v);
                        })))),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "gender" }, "Gender: "),
                React.createElement("select", { id: "gender", className: "form-control " + ((this.state.gender) ? ' act' : '') + " ", onChange: this.onGender, value: this.state.Selected },
                    React.createElement("option", { value: "" }, "choose"),
                    React.createElement("option", { value: "male" }, "male"),
                    React.createElement("option", { value: "female" }, "female")))));
    };
    return Filter;
}(React.Component));
export default Filter;
function range(a, b, c) {
    c = [];
    while (a--)
        c[a] = a + b;
    return c;
}
