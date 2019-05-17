import * as tslib_1 from "tslib";
import React from 'react';
import Input from './Input';
import Button from './Button';
var Choose = /** @class */ (function (_super) {
    tslib_1.__extends(Choose, _super);
    function Choose(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            choose: '',
        };
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }
    Choose.prototype.onChange = function (event) {
        this.setState({
            choose: event.target.value,
        });
    };
    Choose.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "choose" },
            React.createElement("form", null,
                React.createElement("label", { className: "btnLabel" },
                    this.props.feature,
                    ":"),
                React.createElement("div", { className: "form-group" },
                    React.createElement(Input, { type: "text", onChange: this.onChange, value: this.state.choose }),
                    React.createElement(Button, { onClick: function () { return _this.choose(_this.state.choose, _this.props.name); }, text: "Choose" })))));
    };
    return Choose;
}(React.Component));
export default Choose;
