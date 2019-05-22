"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Input_1 = tslib_1.__importDefault(require("./Input"));
const Button_1 = tslib_1.__importDefault(require("./Button"));
class AddItem extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        };
        this.onName = this.onName.bind(this);
        this.onEmail = this.onEmail.bind(this);
        this.onAge = this.onAge.bind(this);
        this.onGender = this.onGender.bind(this);
    }
    onName(event) {
        this.setState({
            name: event.target.value,
        });
    }
    onEmail(event) {
        this.setState({
            email: event.target.value,
        });
    }
    onAge(event) {
        this.setState({
            age: event.target.value,
        });
    }
    onGender(event) {
        this.setState({
            gender: event.target.value,
        });
    }
    render() {
        return (react_1.default.createElement("div", { class: "addItem" },
            react_1.default.createElement("form", { className: "form-inline", role: "form" },
                react_1.default.createElement("div", { className: "form-group" },
                    react_1.default.createElement("label", { htmlFor: "device", className: "sr-only" },
                        this.props.value,
                        ":",
                        ' '),
                    react_1.default.createElement(Input_1.default, { id: "name", type: "text", onChange: this.onName, value: this.state.name })),
                react_1.default.createElement(Button_1.default, { onClick: () => this.props.addItem(this.state), text: "Add" }))));
    }
}
exports.default = AddItem;
