"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Input_1 = tslib_1.__importDefault(require("./Input"));
const Button_1 = tslib_1.__importDefault(require("./Button"));
class Choose extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            choose: '',
        };
        this.onChange = this.onChange.bind(this);
    }
    onChange(event) {
        this.setState({
            choose: event.target.value,
        });
    }
    render() {
        return (react_1.default.createElement("div", { className: "choose" },
            react_1.default.createElement("form", null,
                react_1.default.createElement("label", { className: "btnLabel" },
                    this.props.feature,
                    ":"),
                react_1.default.createElement("div", { className: "form-group" },
                    react_1.default.createElement(Input_1.default, { type: "text", onChange: this.onChange, value: this.state.choose }),
                    react_1.default.createElement(Button_1.default, { onClick: () => this.choose(this.state.choose, this.props.name), text: "Choose" })))));
    }
}
exports.default = Choose;
