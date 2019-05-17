import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Input } from 'react-bootstrap';
import * as authActions from '../store/Auth/actionsAuth';
var SignIn = /** @class */ (function (_super) {
    tslib_1.__extends(SignIn, _super);
    function SignIn(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            username: _this.props.welcomePage || '',
            password: '',
        };
        return _this;
    }
    SignIn.prototype.componentDidMount = function () {
        if (this.state.username.length) {
            this.refs.passwordInput.getInputDOMNode().focus();
        }
        else {
            this.refs.usernameInput.getInputDOMNode().focus();
        }
    };
    SignIn.prototype.handleChange = function (event) {
        if (event.target.name === 'username') {
            this.setState({ username: event.target.value });
        }
        if (event.target.name === 'password') {
            this.setState({ password: event.target.value });
        }
    };
    SignIn.prototype.handleSubmit = function (event) {
        event.preventDefault();
        var dispatch = this.props.dispatch;
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
    };
    SignIn.prototype.render = function () {
        return (React.createElement("div", { className: "autoPages signIn part" },
            React.createElement("header", { style: {
                    display: 'flex',
                    justifyContent: 'center',
                    flexGrow: '0',
                    order: '0',
                } }, "Login to Social"),
            React.createElement("main", { style: { display: 'flex', justifyContent: 'center' } },
                React.createElement("form", { onSubmit: this.handleSubmit },
                    React.createElement(Input, { label: "Username", ref: "usernameInput", type: "text", name: "username", placeholder: "Enter username", value: this.state.username, onChange: this.handleChange }),
                    React.createElement(Input, { label: "Password", ref: "passwordInput", type: "password", name: "password", placeholder: "Enter password", value: this.state.password, onChange: this.handleChange }),
                    React.createElement(Button, { className: "btnAuto", bsStyle: "success", name: "submitButton", type: "submit" },
                        React.createElement("p", { style: {
                                color: 'white',
                                margin: '0',
                                padding: '0',
                                fontSize: '1.5em',
                            } }, "Sign In"))))));
    };
    SignIn.propTypes = {
        welcomePage: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
    };
    return SignIn;
}(Component));
function mapStateToProps(state) {
    return {
        welcomePage: state.welcomePage,
    };
}
export default connect(mapStateToProps)(SignIn);
