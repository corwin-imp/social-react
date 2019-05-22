"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const authActions = tslib_1.__importStar(require("../store/Auth/actionsAuth"));
class SignIn extends react_1.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: this.props.welcomePage || '',
            password: '',
        };
    }
    componentDidMount() {
        if (this.state.username.length) {
            this.refs.passwordInput.getInputDOMNode().focus();
        }
        else {
            this.refs.usernameInput.getInputDOMNode().focus();
        }
    }
    handleChange(event) {
        if (event.target.name === 'username') {
            this.setState({ username: event.target.value });
        }
        if (event.target.name === 'password') {
            this.setState({ password: event.target.value });
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        const { dispatch } = this.props;
        if (this.state.username.length < 1) {
            this.refs.usernameInput.getInputDOMNode().focus();
        }
        if (this.state.username.length > 0 && this.state.password.length < 1) {
            this.refs.passwordInput.getInputDOMNode().focus();
        }
        if (this.state.username.length > 0 && this.state.password.length > 0) {
            var userObj = {
                username: this.state.username,
                password: this.state.password,
            };
            dispatch(authActions.signIn(userObj));
            this.setState({ username: '', password: '' });
        }
    }
    render() {
        return (react_1.default.createElement("div", { className: "autoPages signIn part" },
            react_1.default.createElement("header", { style: {
                    display: 'flex',
                    justifyContent: 'center',
                    flexGrow: '0',
                    order: '0',
                } }, "Login to Social"),
            react_1.default.createElement("main", { style: { display: 'flex', justifyContent: 'center' } },
                react_1.default.createElement("form", { onSubmit: this.handleSubmit },
                    react_1.default.createElement(react_bootstrap_1.Input, { label: "Username", ref: "usernameInput", type: "text", name: "username", placeholder: "Enter username", value: this.state.username, onChange: this.handleChange }),
                    react_1.default.createElement(react_bootstrap_1.Input, { label: "Password", ref: "passwordInput", type: "password", name: "password", placeholder: "Enter password", value: this.state.password, onChange: this.handleChange }),
                    react_1.default.createElement(react_bootstrap_1.Button, { className: "btnAuto", bsStyle: "success", name: "submitButton", type: "submit" },
                        react_1.default.createElement("p", { style: {
                                color: 'white',
                                margin: '0',
                                padding: '0',
                                fontSize: '1.5em',
                            } }, "Sign In"))))));
    }
}
SignIn.propTypes = {
    welcomePage: prop_types_1.default.string.isRequired,
    dispatch: prop_types_1.default.func.isRequired,
};
function mapStateToProps(state) {
    return {
        welcomePage: state.welcomePage,
    };
}
exports.default = react_redux_1.connect(mapStateToProps)(SignIn);
