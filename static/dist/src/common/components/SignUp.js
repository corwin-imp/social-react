import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ChatActions from '../store/Chat/actions';
import { Input, Button } from 'react-bootstrap';
import * as authActions from '../store/Auth/actionsAuth';
var SignUp = /** @class */ (function (_super) {
    tslib_1.__extends(SignUp, _super);
    function SignUp(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            username: _this.props.welcomePage || '',
            password: '',
            confirmPassword: '',
        };
        return _this;
    }
    SignUp.prototype.componentWillMount = function () {
        var _a = this.props, dispatch = _a.dispatch, userValidation = _a.userValidation;
        if (userValidation.length === 0) {
            dispatch(ChatActions.usernameValidationList());
        }
    };
    SignUp.prototype.componentDidMount = function () {
        if (this.state.username.length) {
            this.refs.passwordInput.getInputDOMNode().focus();
        }
        else {
            this.refs.usernameInput.getInputDOMNode().focus();
        }
    };
    SignUp.prototype.handleSubmit = function (event) {
        event.preventDefault();
        var dispatch = this.props.dispatch;
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
            var userObj = {
                username: this.state.username,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            };
            dispatch(authActions.signUp(userObj));
            var initLobby = {
                name: 'Lobby',
                id: 0,
                private: false,
            };
            // dispatch(actions.createChannel(initLobby));
            this.setState({ username: '', password: '', confirmPassword: '' });
        }
    };
    SignUp.prototype.handleChange = function (event) {
        if (event.target.name === 'username') {
            this.setState({ username: event.target.value });
        }
        if (event.target.name === 'password') {
            this.setState({ password: event.target.value });
        }
        if (event.target.name === 'confirm-password') {
            this.setState({ confirmPassword: event.target.value });
        }
    };
    SignUp.prototype.validateUsername = function () {
        var _this = this;
        var userValidation = this.props.userValidation;
        if (userValidation.filter(function (user) {
            return user === _this.state.username.trim();
        }).length > 0) {
            return 'error';
        }
        return 'success';
    };
    SignUp.prototype.validateConfirmPassword = function () {
        if (this.state.confirmPassword.length > 0 &&
            this.state.password.length > 0) {
            if (this.state.password === this.state.confirmPassword) {
                return 'success';
            }
            return 'error';
        }
    };
    SignUp.prototype.render = function () {
        return (React.createElement("div", { className: "autoPages signIn part" },
            React.createElement("header", { style: {
                    display: 'flex',
                    justifyContent: 'center',
                    flexGrow: '0',
                    order: '0',
                } }, "Sign Up"),
            React.createElement("main", { style: { display: 'flex', justifyContent: 'center' } },
                React.createElement("form", { onSubmit: this.handleSubmit },
                    React.createElement("section", { style: { height: '6em' } },
                        React.createElement(Input, { label: "Username", ref: "usernameInput", type: "text", help: this.validateUsername() === 'error' &&
                                'A user with that name already exists!', bsStyle: this.validateUsername(), hasFeedback: true, name: "username", autoFocus: "true", placeholder: "Enter username", value: this.state.username, onChange: this.handleChange })),
                    React.createElement("section", { style: { height: '6em' } },
                        React.createElement(Input, { label: "Password", ref: "passwordInput", type: "password", name: "password", value: this.state.password, placeholder: "Enter password", onChange: this.handleChange })),
                    React.createElement("section", { style: { height: '6em' } },
                        React.createElement(Input, { label: "Confirm Password", ref: "confirmPasswordInput", help: this.validateConfirmPassword() === 'error' &&
                                "Your password doesn't match", type: "password", name: "confirm-password", placeholder: "Enter password again", value: this.state.confirmPassword, onChange: this.handleChange })),
                    React.createElement(Button, { disabled: this.validateUsername() === 'error' ||
                            (this.validateConfirmPassword() === 'error' && true), bsStyle: "success", style: { width: '100%', height: '4rem', marginTop: '2rem' }, onClick: this.handleSubmit, type: "submit" },
                        React.createElement("p", { style: {
                                color: 'white',
                                margin: '0',
                                padding: '0',
                                fontSize: '1.5em',
                            } }, "Sign Up"))))));
    };
    SignUp.propTypes = {
        welcomePage: PropTypes.string.isRequired,
        // userValidation: PropTypes.array.isrequired,
        dispatch: PropTypes.func.isRequired,
    };
    return SignUp;
}(Component));
function mapStateToProps(state) {
    return {
        welcomePage: state.welcomePage,
        userValidation: state.userValidation.data,
    };
}
export default connect(mapStateToProps)(SignUp);
