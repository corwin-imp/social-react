"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const Input_1 = tslib_1.__importDefault(require("./Input"));
const react_fontawesome_1 = tslib_1.__importDefault(require("react-fontawesome"));
class Filter extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            ageFr: '',
            ageTo: '',
            gender: '',
            city: this.props.city,
            country: this.props.country,
            countrySend: this.props.countrySend,
            citySend: this.props.citySend,
        };
        this.onAgeFr = this.onAgeFr.bind(this);
        this.onAgeTo = this.onAgeTo.bind(this);
        this.sendTo = this.sendTo.bind(this);
        this.onGender = this.onGender.bind(this);
    }
    findFull(state) {
        console.log('state', state);
        this.props.onFindSearch(state);
    }
    sendTo() {
        this.props.onFindSearch(this.state);
    }
    onAgeFr(event) {
        this.setState({
            ageFr: event.target.value,
        });
        this.findFull({
            ...this.state,
            ageFr: event.target.value,
        });
    }
    onAgeTo(event) {
        this.setState({
            ageTo: event.target.value,
        });
        this.findFull({
            ...this.state,
            ageTo: event.target.value,
        });
    }
    onGender(event) {
        this.setState({
            gender: event.target.value,
        });
        this.findFull({
            ...this.state,
            gender: event.target.value,
        });
    }
    render() {
        return (react_1.default.createElement("form", { role: "form" },
            react_1.default.createElement("b", null, "Country:"),
            react_1.default.createElement("div", { className: "form-group formInp" },
                react_1.default.createElement(Input_1.default, { id: "country", className: `form-control`, type: "text", onChange: this.props.onCountry, onKeyPress: this.sendTo, value: this.state.country }),
                react_1.default.createElement(react_bootstrap_1.Button, { className: `btnSearch ${(this.props.countrySend) ? ' act' : ''} `, onClick: this.sendTo },
                    react_1.default.createElement(react_fontawesome_1.default, { className: "super-crazy-colors", name: "search", size: "lg" }))),
            react_1.default.createElement("b", null, "City:"),
            react_1.default.createElement("div", { className: "form-group formInp" },
                react_1.default.createElement(Input_1.default, { id: "city", className: `form-control`, type: "text", onKeyPress: this.sendTo, onChange: this.props.onCity, value: this.state.city }),
                react_1.default.createElement(react_bootstrap_1.Button, { className: `btnSearch ${(this.props.citySend) ? ' act' : ''} `, onClick: this.sendTo },
                    react_1.default.createElement(react_fontawesome_1.default, { className: "super-crazy-colors", name: "search", size: "lg" }))),
            react_1.default.createElement("div", { className: "form-group" },
                react_1.default.createElement("label", { htmlFor: "age" }, "Age: "),
                react_1.default.createElement("div", { className: "selects" },
                    react_1.default.createElement("span", null, "From:"),
                    react_1.default.createElement("select", { id: "ageFr", className: `form-control ${(this.state.ageFr) ? ' act' : ''} `, onChange: this.onAgeFr, value: this.state.Selected },
                        react_1.default.createElement("option", { value: "" }, "choose"),
                        range(71, 10).map((v, k) => react_1.default.createElement("option", { key: v, value: v }, `from ${v}`))),
                    react_1.default.createElement("span", null, "To:"),
                    react_1.default.createElement("select", { id: "ageTo", className: `form-control ${(this.state.ageTo) ? ' act' : ''} `, onChange: this.onAgeTo, value: this.state.Selected },
                        react_1.default.createElement("option", { value: "" }, "choose"),
                        range(71, 10).map((v, k) => react_1.default.createElement("option", { key: v, value: v }, `to ${v}`))))),
            react_1.default.createElement("div", { className: "form-group" },
                react_1.default.createElement("label", { htmlFor: "gender" }, "Gender: "),
                react_1.default.createElement("select", { id: "gender", className: `form-control ${(this.state.gender) ? ' act' : ''} `, onChange: this.onGender, value: this.state.Selected },
                    react_1.default.createElement("option", { value: "" }, "choose"),
                    react_1.default.createElement("option", { value: "male" }, "male"),
                    react_1.default.createElement("option", { value: "female" }, "female")))));
    }
}
exports.default = Filter;
function range(a, b, c) {
    c = [];
    while (a--)
        c[a] = a + b;
    return c;
}
