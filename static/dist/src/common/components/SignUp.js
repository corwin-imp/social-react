"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const ChatActions = tslib_1.__importStar(require("../store/Chat/actions"));
const react_bootstrap_1 = require("react-bootstrap");
const authActions = tslib_1.__importStar(require("../store/Auth/actionsAuth"));
class SignUp extends react_1.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: this.props.welcomePage || '',
            password: '',
            confirmPassword: '',
        };
    }
    componentWillMount() {
        const { dispatch, userValidation } = this.props;
        if (userValidation.length === 0) {
            dispatch(ChatActions.usernameValidationList());
        }
    }
    componentDidMount() {
        if (this.state.username.length) {
            this.refs.passwordInput.getInputDOMNode().focus();
        }
        else {
            this.refs.usernameInput.getInputDOMNode().focus();
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        const { dispatch } = this.props;
        if (!this.state.username.length) {
            this.refs.usernameInput.getInputDOMNode().focus();
        }
        if (this.state.username.length && !this.state.password.length) {
            this.refs.passwordInput.getInputDOMNode().focus();
        }
        if (this.state.username.length &&
            this.state.password.length &&
            !this.state.confirmPassword.length) {
            this.refs.confirmPasswordInput.getInputDOMNode().focus();
        }
        if (this.state.username.length &&
            this.state.password.length &&
            this.state.confirmPassword.length) {
            console.log('state', this.state);
            const userObj = {
                username: this.state.username,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            };
            dispatch(authActions.signUp(userObj));
            const initLobby = {
                name: 'Lobby',
                id: 0,
                private: false,
            };
            // dispatch(actions.createChannel(initLobby));
            this.setState({ username: '', password: '', confirmPassword: '' });
        }
    }
    handleChange(event) {
        if (event.target.name === 'username') {
            this.setState({ username: event.target.value });
        }
        if (event.target.name === 'password') {
            this.setState({ password: event.target.value });
        }
        if (event.target.name === 'confirm-password') {
            this.setState({ confirmPassword: event.target.value });
        }
    }
    validateUsername() {
        const { userValidation } = this.props;
        if (userValidation.filter(user => {
            return user === this.state.username.trim();
        }).length > 0) {
            return 'error';
        }
        return 'success';
    }
    validateConfirmPassword() {
        if (this.state.confirmPassword.length > 0 &&
            this.state.password.length > 0) {
            if (this.state.password === this.state.confirmPassword) {
                return 'success';
            }
            return 'error';
        }
    }
    render() {
        return (react_1.default.createElement("div", { className: "autoPages signIn part" },
            react_1.default.createElement("header", { style: {
                    display: 'flex',
                    justifyContent: 'center',
                    flexGrow: '0',
                    order: '0',
                } }, "Sign Up"),
            react_1.default.createElement("main", { style: { display: 'flex', justifyContent: 'center' } },
                react_1.default.createElement("form", { onSubmit: this.handleSubmit },
                    react_1.default.createElement("section", { style: { height: '6em' } },
                        react_1.default.createElement(react_bootstrap_1.Input, { label: "Username", ref: "usernameInput", type: "text", help: this.validateUsername() === 'error' &&
                                'A user with that name already exists!', bsStyle: this.validateUsername(), hasFeedback: true, name: "username", autoFocus: "true", placeholder: "Enter username", value: this.state.username, onChange: this.handleChange })),
                    react_1.default.createElement("section", { style: { height: '6em' } },
                        react_1.default.createElement(react_bootstrap_1.Input, { label: "Password", ref: "passwordInput", type: "password", name: "password", value: this.state.password, placeholder: "Enter password", onChange: this.handleChange })),
                    react_1.default.createElement("section", { style: { height: '6em' } },
                        react_1.default.createElement(react_bootstrap_1.Input, { label: "Confirm Password", ref: "confirmPasswordInput", help: this.validateConfirmPassword() === 'error' &&
                                "Your password doesn't match", type: "password", name: "confirm-password", placeholder: "Enter password again", value: this.state.confirmPassword, onChange: this.handleChange })),
                    react_1.default.createElement(react_bootstrap_1.Button, { disabled: this.validateUsername() === 'error' ||
                            (this.validateConfirmPassword() === 'error' && true), bsStyle: "success", style: { width: '100%', height: '4rem', marginTop: '2rem' }, onClick: this.handleSubmit, type: "submit" },
                        react_1.default.createElement("p", { style: {
                                color: 'white',
                                margin: '0',
                                padding: '0',
                                fontSize: '1.5em',
                            } }, "Sign Up"))))));
    }
}
SignUp.propTypes = {
    welcomePage: prop_types_1.default.string.isRequired,
    // userValidation: PropTypes.array.isrequired,
    dispatch: prop_types_1.default.func.isRequired,
};
function mapStateToProps(state) {
    return {
        welcomePage: state.welcomePage,
        userValidation: state.userValidation.data,
    };
}
exports.default = react_redux_1.connect(mapStateToProps)(SignUp);
