"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Input_1 = tslib_1.__importDefault(require("./Input"));
const Button_1 = tslib_1.__importDefault(require("./Button"));
class Form extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
        };
        this.onChange = this.onChange.bind(this);
    }
    onChange(event) {
        this.setState({
            number: event.target.value,
        });
    }
    render() {
        return (react_1.default.createElement("form", null,
            react_1.default.createElement("div", { className: "form-group" },
                react_1.default.createElement("label", { for: "device" },
                    "Number:",
                    react_1.default.createElement(Input_1.default, { placeholder: "Choose device", id: "device", type: "number", className: "form-control", onChange: this.onChange, value: this.state.number }))),
            react_1.default.createElement(Button_1.default, { onClick: () => this.props.add(this.state.number), text: "+" }),
            react_1.default.createElement(Button_1.default, { onClick: () => this.props.del(this.state.number), text: "-" }),
            react_1.default.createElement("div", null,
                "Sum: ",
                this.props.sum)));
    }
}
exports.default = Form;
