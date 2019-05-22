"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const Button_1 = tslib_1.__importDefault(require("./Button"));
class ItemUpdate extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.item.name,
            age: this.props.item.age,
            gender: 'male',
            email: this.props.item.email,
            city: this.props.item.city,
            country: this.props.item.country,
            idItem: this.props.idItem,
        };
        this.onName = this.onName.bind(this);
        this.onEmail = this.onEmail.bind(this);
        this.onAge = this.onAge.bind(this);
        this.onGender = this.onGender.bind(this);
        this.onCountry = this.onCountry.bind(this);
        this.onCity = this.onCity.bind(this);
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
    onCountry(event) {
        this.setState({
            country: event.target.value,
        });
    }
    onCity(event) {
        this.setState({
            city: event.target.value,
        });
    }
    render() {
        return (react_1.default.createElement("form", { role: "form" },
            react_1.default.createElement("div", { className: "form-group" },
                react_1.default.createElement("label", { htmlFor: "name" }, "Name:"),
                react_1.default.createElement(react_bootstrap_1.Input, { id: "name", className: "form-control", type: "text", onChange: this.onName, value: this.state.name })),
            react_1.default.createElement("div", { className: "form-group" },
                react_1.default.createElement("label", { htmlFor: "email" }, "Email"),
                react_1.default.createElement(react_bootstrap_1.Input, { id: "email", className: "form-control", type: "text", onChange: this.onEmail, value: this.state.email })),
            react_1.default.createElement("div", { className: "form-group" },
                react_1.default.createElement("label", { htmlFor: "city" }, "City:"),
                react_1.default.createElement(react_bootstrap_1.Input, { id: "city", className: "form-control", type: "text", onChange: this.onCity, value: this.state.city })),
            react_1.default.createElement("div", { className: "form-group" },
                react_1.default.createElement("label", { htmlFor: "country" }, "Country:"),
                react_1.default.createElement(react_bootstrap_1.Input, { id: "country", className: "form-control", type: "text", onChange: this.onCountry, value: this.state.country })),
            react_1.default.createElement("div", { className: "form-group" },
                react_1.default.createElement("label", { htmlFor: "age" }, "Age: "),
                react_1.default.createElement(react_bootstrap_1.Input, { id: "age", min: "0", className: "form-control", type: "number", onChange: this.onAge, value: this.state.age })),
            react_1.default.createElement("div", { className: "form-group" },
                react_1.default.createElement("label", { htmlFor: "gender" }, "Gender: "),
                react_1.default.createElement("select", { id: "gender", className: "form-control", onChange: this.onGender, value: this.state.Selected },
                    react_1.default.createElement("option", { value: "male" }, "male"),
                    react_1.default.createElement("option", { value: "female" }, "female"))),
            react_1.default.createElement(Button_1.default, { onClick: () => this.props.updateItem(this.state, this.props.item.id), text: "Update" })));
    }
}
exports.default = ItemUpdate;
