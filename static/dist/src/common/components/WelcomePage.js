import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { welcomePage } from '../store/App/actionsApp';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
var WelcomePage = /** @class */ (function (_super) {
    tslib_1.__extends(WelcomePage, _super);
    function WelcomePage(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            username: '',
        };
        return _this;
    }
    WelcomePage.prototype.componentDidMount = function () {
        this.usernameInput.focus();
    };
    WelcomePage.prototype.handleChange = function (event) {
        if (event.target.name === 'username') {
            this.setState({ username: event.target.value });
        }
    };
    WelcomePage.prototype.handleSubmit = function () {
        var dispatch = this.props.dispatch;
        var username = this.state.username;
        dispatch(welcomePage(username));
        this.setState({ username: '' });
    };
    WelcomePage.prototype.render = function () {
        var _this = this;
        var screenWidth = this.props.screenWidth;
        /*if(screenWidth < 500) {
             return (
             <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
             <header style={{textAlign: 'center'}}>
    
             </header>
             <main>
             <form>
             <Input
             style={{height: '2.7em', fontSize: '1.3em', width: '100%'}}
             ref="usernameInput"
             type="text"
             name="username"
             value={this.state.username}
             placeholder="Enter username"
             onChange={this.handleChange}
             />
             <Link to="/signup">
             <Button
             bsStyle="success"
             style={{width: '100%'}}
             type="submit"
             onClick={this.handleSubmit}>
             <p style={{margin: '0', padding: '0', fontSize: '1.5em'}}>Sign Up</p>
             </Button>
             </Link>
             </form>
             <p style={{margin: '1em', textAlign: 'center'}}>Or</p>
             <Link to="/signin">
             <Button style={{width: '100%'}} bsStyle="default" >Sign in</Button>
             </Link>
             </main>
             </div>
             );
             }*/
        return (React.createElement("div", { className: "autoPages part" },
            React.createElement("header", { style: {
                    display: 'flex',
                    justifyContent: 'center',
                    flexGrow: '0',
                    order: '0',
                } }, "Sign Up to Social"),
            React.createElement("main", { style: { display: 'flex', justifyContent: 'center' } },
                React.createElement("form", { style: { display: 'flex', justifyContent: 'center' } },
                    React.createElement("div", { style: { margin: 'auto', paddingRight: '0.2em', height: '3.5em' } },
                        React.createElement(Form.Control, { style: { height: '2.7em', fontSize: '1.3em' }, ref: function (ref) { return _this.usernameInput = ref; }, type: "text", name: "username", value: this.state.username, placeholder: "Enter username", onChange: this.handleChange })),
                    React.createElement("section", { style: { margin: 'auto', width: '12em', height: '3.5em' } },
                        React.createElement(Link, { to: "/signup" },
                            React.createElement(Button, { className: "btnAuto", variant: "success", type: "submit", onClick: this.handleSubmit },
                                React.createElement("p", { style: { margin: '0', padding: '0', fontSize: '1.5em' } }, "Sign Up"))))),
                React.createElement("div", { style: {
                        height: '3.5em',
                        width: '12em',
                        alignSelf: 'center',
                        display: 'flex',
                        marginLeft: '1em',
                    } },
                    React.createElement("p", { style: { marginRight: '1em', marginTop: '1em' } }, " Or "),
                    React.createElement(Link, { to: "/signin" },
                        React.createElement(Button, { style: { margin: 'auto', height: '3.5em' }, variant: "default" }, "Sign in"))))));
    };
    WelcomePage.propTypes = {
        dispatch: PropTypes.func.isRequired,
    };
    return WelcomePage;
}(Component));
function mapStateToProps(state) {
    return {
        screenWidth: state.environment.screenWidth,
    };
}
export default connect(mapStateToProps)(WelcomePage);
