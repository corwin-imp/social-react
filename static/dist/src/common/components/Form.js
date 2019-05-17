import * as tslib_1 from "tslib";
import React from 'react';
import Input from './Input';
import Button from './Button';
var Form = /** @class */ (function (_super) {
    tslib_1.__extends(Form, _super);
    function Form(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            number: 0,
        };
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }
    Form.prototype.onChange = function (event) {
        this.setState({
            number: event.target.value,
        });
    };
    Form.prototype.render = function () {
        var _this = this;
        return (React.createElement("form", null,
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { for: "device" },
                    "Number:",
                    React.createElement(Input, { placeholder: "Choose device", id: "device", type: "number", className: "form-control", onChange: this.onChange, value: this.state.number }))),
            React.createElement(Button, { onClick: function () { return _this.props.add(_this.state.number); }, text: "+" }),
            React.createElement(Button, { onClick: function () { return _this.props.del(_this.state.number); }, text: "-" }),
            React.createElement("div", null,
                "Sum: ",
                this.props.sum)));
    };
    return Form;
}(React.Component));
export default Form;
