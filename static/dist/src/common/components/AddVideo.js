"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Input_1 = tslib_1.__importDefault(require("./Input"));
const Button_1 = tslib_1.__importDefault(require("./Button"));
class AddVideo extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            src: '',
        };
        this.onName = this.onName.bind(this);
        this.onSrc = this.onSrc.bind(this);
    }
    onName(event) {
        this.setState({
            name: event.target.value,
        });
    }
    onSrc(event) {
        this.setState({
            src: event.target.value,
        });
    }
    render() {
        return (react_1.default.createElement("div", { className: "part addVideo" },
            react_1.default.createElement("div", { className: "title" }, "Add video"),
            react_1.default.createElement("form", { className: "form-inline", role: "form" },
                react_1.default.createElement("div", { className: "form-group" },
                    react_1.default.createElement("label", { htmlFor: "labelVideo" }, "Label video: "),
                    react_1.default.createElement(Input_1.default, { id: "labelVideo", type: "text", onChange: this.onName, value: this.state.name }),
                    react_1.default.createElement("label", { htmlFor: "src" }, "Src:"),
                    react_1.default.createElement(Input_1.default, { id: "src", type: "text", onChange: this.onSrc, value: this.state.src })),
                react_1.default.createElement(Button_1.default, { onCl: "btnAdd", onClick: () => this.props.addVideo(this.state), text: "Add" }))));
    }
}
exports.default = AddVideo;
